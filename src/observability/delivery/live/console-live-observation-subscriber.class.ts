import { LiveObservationSource, LiveObservationListener } from "src/observability/contracts/delivery/live/live-observation-source.interface";
import { Observation } from "src/observability/contracts/observation/observation.interface";


/**
 * Displays live observations in the application console.
 *
 * This subscriber receives observations from a LiveObservationSource.
 * It does not create observations, manage their delivery, or retain
 * observations missed while unsubscribed.
 *
 * The subscriber can be started and stopped independently.
 */
export class ConsoleLiveObservationSubscriber {
  /**
   * Unsubscribe function for the active subscription.
   *
   * Undefined when the subscriber is stopped.
   */
  private unsubscribe?: () => void;

  constructor(
    private readonly source: LiveObservationSource,
  ) {}

  /**
   * Starts listening for live observations.
   *
   * Repeated calls while already subscribed do not create duplicate
   * subscriptions.
   *
   * If subscription fails, the error propagates to the caller and
   * the subscriber remains stopped.
   */
  start(): void {
    if (this.unsubscribe) {
      return;
    }

    const unsubscribe = this.source.subscribe(
      this.handleObservation,
    );

    this.unsubscribe = unsubscribe;
  }

  /**
   * Stops listening for live observations.
   *
   * Calling this method when already stopped has no effect.
   *
   * If unsubscription fails, the error propagates and the existing
   * unsubscribe function is retained so the caller can retry.
   */
  stop(): void {
    const unsubscribe = this.unsubscribe;

    if (!unsubscribe) {
      return;
    }

    unsubscribe();

    // Clear the subscription only after successful unsubscription.
    this.unsubscribe = undefined;
  }

  /**
   * Handles an observation received from the live source.
   *
   * @param observation - The observation to display.
   */
  private readonly handleObservation: LiveObservationListener = (
    observation: Observation,
  ): void => {
    console.log('[LIVE OBSERVATION]', observation);
  };
}
