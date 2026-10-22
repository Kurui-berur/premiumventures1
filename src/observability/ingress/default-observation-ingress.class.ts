import { ObservationIngress } from "../contracts/buffer/ingress/observation-ingress.interface";
import { ObservationBuffer } from "../contracts/buffer/observation-buffer.interface";
import { ObservationWorkNotifier } from "../contracts/delivery/durable/notifier/observation-work-notifier.interface";
import { Observation } from "../contracts/observation/observation.interface";

/**
 * Coordinates acceptance of observations into the in-memory
 * observability delivery pipeline and notification of the worker.
 *
 * Comprehensive observation validation and durable persistence
 * are delegated to downstream components.
 */
export class DefaultObservationIngress implements ObservationIngress {
  constructor(
    private readonly observationBuffer: ObservationBuffer,
    private readonly workNotifier: ObservationWorkNotifier,
  ) {}

  /**
   * Accepts an observation into the buffer and signals the worker
   * that work may be available.
   *
   * Buffer acceptance occurs before notification. If notification
   * fails after acceptance, the buffer entry remains accepted.
   *
   * @param observation - The observation submitted for acceptance.
   * @returns The buffer ID identifying the accepted or reused entry.
   */
  accept(observation: Observation): string {
    const bufferId = this.observationBuffer.receive(observation);

    this.workNotifier.notifyWorkAvailable();

    return bufferId;
  }
}
