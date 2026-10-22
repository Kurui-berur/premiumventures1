import { LiveObservationBroadcaster } from "src/observability/contracts/delivery/live/live-observation-broadcaster.interface";
import { LiveObservationSource, LiveObservationListener } from "src/observability/contracts/delivery/live/live-observation-source.interface";
import { Observation } from "src/observability/contracts/observation/observation.interface";

/**
 * Broadcasts observations to currently subscribed live consumers.
 *
 * Delivery is best-effort. Observations are not retained for consumers
 * that are disconnected or subscribe after a broadcast is accepted.
 *
 * Subscriber failures are isolated: one subscriber failing must not
 * prevent delivery attempts to other subscribers.
 */
export class InMemoryLiveObservationBroadcaster
  implements LiveObservationBroadcaster, LiveObservationSource {

  /**
   * Currently subscribed live consumers.
   */
  private readonly listeners =
    new Set<LiveObservationListener>();

  /**
   * Registers a listener for live observations.
   *
   * @param listener - Consumer to receive live observations.
   * @returns A function that unsubscribes this listener.
   */
  subscribe(listener: LiveObservationListener): () => void {
    this.listeners.add(listener);

    // Set.delete() makes repeated unsubscription harmless.
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Accepts an observation for asynchronous distribution.
   *
   * Resolves after delivery has been scheduled. It does not wait for
   * subscribers to receive or process the observation.
   *
   * If no subscribers are present, the observation is discarded.
   *
   * @param observation - Observation to broadcast.
   * @returns A promise representing acceptance for distribution.
   */
  async broadcast(observation: Observation): Promise<void> {
    const recipients = [...this.listeners];

    // Best-effort live delivery: nobody is listening, so nothing
    // needs to be retained.
    if (recipients.length === 0) {
      return;
    }

    // Schedule delivery outside the current call.
    setImmediate(() => {
      for (const listener of recipients) {
        // Allow a consumer to cancel a scheduled delivery by unsubscribing.
        if (!this.listeners.has(listener)) {
          continue;
        }

        try {
          const result = listener(observation);

          // Handle asynchronous subscriber failures without awaiting
          // the subscriber or blocking other listeners.
          if (result !== undefined) {
            void Promise.resolve(result).catch((error: unknown) => {
              this.reportListenerFailure(error);
            });
          }
        } catch (error: unknown) {
          // A synchronous failure must not stop other listeners.
          this.reportListenerFailure(error);
        }
      }
    });
  }

  /**
   * Reports a subscriber failure without propagating it into the
   * broadcast operation.
   */
  private reportListenerFailure(error: unknown): void {
    try {
      console.error(
        '[InMemoryLiveObservationBroadcaster] Subscriber failed:',
        error,
      );
    } catch {
      // A logging failure must not interrupt other subscribers.
    }
  }
}
