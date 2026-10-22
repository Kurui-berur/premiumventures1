import { EventEnvelope } from "src/event-system/contracts/event-envelope.interface";


/**
 * Data placed into a BullMQ job for event delivery.
 *
 * This contract belongs exclusively to the BullMQ infrastructure
 * implementation. It is not part of the domain-agnostic Event System
 * contract.
 *
 * The job represents a request for the BullMQ delivery mechanism to
 * deliver an established event publication.
 *
 * The job must contain only serializable data. It must never contain
 * an EventHandler instance, Nest provider instance, function, or
 * mutable runtime object.
 *
 * Domain and flow ownership are intentionally absent.
 *
 * The Event System does not determine whether an event belongs to a
 * FlowContext, DomainContext, or any other context. That association
 * is established by the consumer after delivery.
 */
export interface BullMqEventJob<TPayload = unknown> {

    /**
     * The publication being delivered.
     *
     * The envelope is carried unchanged through the queue boundary.
     */
    readonly envelope: EventEnvelope<TPayload>;
}