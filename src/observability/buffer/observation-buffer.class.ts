
import { PendingNodeLinkedList } from "../cdts/pending-node-linked-list.class";
import { BufferEntry } from "../contracts/buffer/buffer-entry.interface";
import { BufferedObservation } from "../contracts/buffer/buffered-observation.interface";
import { ObservationBufferStats } from "../contracts/buffer/observation-buffer-stats.interface";
import { ObservationBuffer } from "../contracts/buffer/observation-buffer.interface";
import { PendingNode } from "../contracts/nodes/pending-node.interface";
import { Observation } from "../contracts/observation/observation.interface";

/**
 * Provides an in-memory implementation of the ObservationBuffer contract.
 *
 * The buffer manages observations awaiting publication and tracks their
 * lifecycle as they move between the pending and in-flight states.
 *
 * A PendingNodeLinkedList maintains the FIFO order of pending observations,
 * while the entries map stores each active observation and its current state.
 *
 * Responsibilities:
 * - Accept and register observations.
 * - Assign a stable buffer identifier derived from the observation ID.
 * - Prevent duplicate active entries for the same observation ID.
 * - Claim batches of pending observations for publication.
 * - Track observations currently in flight.
 * - Remove successfully acknowledged observations from active tracking.
 * - Return failed in-flight observations to the pending queue.
 * - Maintain workload and lifecycle statistics.
 *
 * This implementation is not durable. Pending and in-flight observations
 * may be lost if the process terminates before they are handed off safely.
 *
 * Idempotency is limited to the lifetime of an active buffer entry.
 * Once an entry is acknowledged and removed, a later submission of the
 * same observation may create a new active entry.
 */
export class InMemoryObservationBuffer implements ObservationBuffer {

    /**
     * Stores active buffer entries, indexed by their buffer identifiers.
     *
     * Entries remain here while pending or in flight. They are removed
     * when successfully acknowledged.
     */
    private readonly entries: Map<string, BufferEntry> = new Map();

    /**
     * Cumulative number of observations newly accepted by this buffer.
     *
     * Duplicate submissions that match an existing active entry do not
     * increment this counter.
     */
    private receivedCount: number = 0;

    /**
     * Number of observations currently waiting in the pending linked list.
     */
    private pendingCount: number = 0;

    /**
     * Number of observations currently claimed by a publisher.
     */
    private inFlightCount: number = 0;

    /**
     * Cumulative number of observations successfully acknowledged.
     */
    private totalAcknowledged: number = 0;

    /**
     * Cumulative number of successful transitions from in-flight
     * back to pending.
     *
     * This counts release operations, not distinct observations.
     */
    private totalReleased: number = 0;

    /**
     * Creates an observation buffer using the supplied pending-node list.
     *
     * @param pendingNodeList - Manages the ordering and node connections
     * for observations waiting to be published.
     */
    constructor(
        private readonly pendingNodeList: PendingNodeLinkedList
    ) {}

    /**
     * Accepts an observation and registers it as pending.
     *
     * The buffer ID is derived from the observation's ID. If the same
     * observation already has an active entry, the existing buffer ID
     * is returned without creating another entry.
     *
     * A new observation is registered in the entries map and appended
     * to the pending linked list.
     *
     * @param observation - The observation to accept into the buffer.
     * @returns The buffer identifier assigned to the observation.
     * @throws If the pending-node list cannot accept the new node.
     */
    receive(observation: Observation): string {
        const bufferId = `buffer:${observation.id}`;

        // Prevent duplicate active entries for the same observation.
        if (this.entries.has(bufferId)) {
            return bufferId;
        }

        const node: PendingNode = {
            bufferId,
        };

        const bufferEntry: BufferEntry = {
            observation,
            observationState: 'PENDING',
            pendingNode: node,
        };

        // Register the entry before inserting its node.
        this.entries.set(bufferId, bufferEntry);

        try {
            this.pendingNodeList.enqueue(node);
        } catch (error) {
            // Roll back registration if insertion fails.
            this.entries.delete(bufferId);
            throw error;
        }

        this.receivedCount++;
        this.pendingCount++;

        return bufferId;
    }

    /**
     * Claims a batch of pending observations for publication.
     *
     * Observations are claimed in FIFO order. Each claimed observation
     * is removed from the pending linked list and marked as IN_FLIGHT,
     * but remains in the entries map until it is acknowledged.
     *
     * If fewer observations are pending than the requested limit,
     * the returned batch contains only those available.
     *
     * @param limit - Maximum number of observations to claim.
     * @returns The claimed observations with their buffer identifiers.
     * @throws {RangeError} If limit is not a positive safe integer.
     * @throws {Error} If the pending list and entries map are inconsistent.
     */
    takeBatch(limit: number): BufferedObservation[] {
        // Validate before modifying the buffer.
        if (!Number.isSafeInteger(limit) || limit <= 0) {
            throw new RangeError(
                'Batch limit must be a positive safe integer.'
            );
        }

        const batch: BufferedObservation[] = [];

        while (batch.length < limit) {
            // Inspect the oldest pending node.
            const node = this.pendingNodeList.peek();

            if (node === undefined) {
                break;
            }

            const entry = this.entries.get(node.bufferId);

            if (!entry) {
                throw new Error(
                    `Missing buffer entry for "${node.bufferId}".`
                );
            }

            if (entry.observationState !== 'PENDING') {
                throw new Error(
                    `Observation "${node.bufferId}" is not pending.`
                );
            }

            if (entry.pendingNode !== node) {
                throw new Error(
                    `Pending node mismatch for "${node.bufferId}".`
                );
            }

            // Remove the oldest node from the pending list.
            const removedNode = this.pendingNodeList.dequeue();

            if (removedNode !== node) {
                throw new Error(
                    'Pending queue returned an unexpected node.'
                );
            }

            // Move the observation into the in-flight state.
            entry.observationState = 'IN_FLIGHT';
            entry.pendingNode = undefined;

            this.pendingCount--;
            this.inFlightCount++;

            batch.push({
                bufferId: node.bufferId,
                observation: entry.observation,
            });
        }

        return batch;
    }

    /**
     * Acknowledges observations whose downstream publication succeeded.
     *
     * Only observations currently in flight are acknowledged. Successful
     * acknowledgements remove entries from active tracking and update
     * the in-flight and acknowledgement counters.
     *
     * Unknown identifiers, repeated acknowledgements, and identifiers
     * belonging to pending observations are ignored.
     *
     * @param ids - Buffer identifiers of successfully published observations.
     */
    acknowledge(ids: readonly string[]): void {
        for (const bufferId of ids) {
            const entry = this.entries.get(bufferId);

            // Ignore unknown identifiers and repeated acknowledgements.
            if (!entry) {
                continue;
            }

            // Only in-flight observations may be acknowledged.
            if (entry.observationState !== 'IN_FLIGHT') {
                continue;
            }

            this.entries.delete(bufferId);

            this.inFlightCount--;
            this.totalAcknowledged++;
        }
    }

    /**
     * Releases failed in-flight observations back to the pending queue.
     *
     * Each eligible observation receives a new pending node that is
     * appended to the tail of the linked list. Its entry remains in the
     * map and transitions from IN_FLIGHT to PENDING.
     *
     * Unknown identifiers, repeated releases, and identifiers belonging
     * to observations that are not in flight are ignored.
     *
     * @param ids - Buffer identifiers of observations to release.
     * @throws If the pending-node list cannot accept a released node.
     */
    release(ids: readonly string[]): void {
        for (const bufferId of ids) {
            const entry = this.entries.get(bufferId);

            if (!entry || entry.observationState !== 'IN_FLIGHT') {
                continue;
            }

            const node: PendingNode = {
                bufferId,
            };

            // Enqueue before changing state so a failed insertion leaves
            // the entry marked IN_FLIGHT.
            this.pendingNodeList.enqueue(node);

            entry.pendingNode = node;
            entry.observationState = 'PENDING';

            this.inFlightCount--;
            this.pendingCount++;
            this.totalReleased++;
        }
    }

    /**
     * Returns a snapshot of the buffer's current workload and counters.
     *
     * The snapshot distinguishes current pending and in-flight workload
     * from cumulative acceptance, acknowledgement, and release counts.
     * Modifying the returned object does not modify the buffer's counters.
     *
     * @returns The current observation buffer statistics.
     */
    getStats(): ObservationBufferStats {
        const stats: ObservationBufferStats = {
            received: this.receivedCount,
            pending: this.pendingCount,
            inFlight: this.inFlightCount,
            acknowledged: this.totalAcknowledged,
            released: this.totalReleased,
        };

        return stats;
    }
}