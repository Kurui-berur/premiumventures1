/**
 * Defines the signaling boundary between observation ingress
 * and the observation delivery worker.
 *
 * The notifier informs the worker that observations may be available
 * for delivery. It does not own observations, inspect the buffer,
 * select batches, or perform delivery.
 *
 * Notifications are signals that work may exist, not a count of
 * observations waiting to be processed.
 */
export interface ObservationWorkNotifier {
  /**
   * Signals that work may be available for delivery.
   *
   * Notifications may be coalesced when multiple signals occur before
   * the worker resumes. Calling this method must not require the caller
   * to wait for the worker to process the notification.
   */
  notifyWorkAvailable(): void;

  /**
   * Waits until work may be available or the wait is aborted.
   *
   * The implementation must avoid lost wake-ups: if work is signaled
   * immediately before the worker begins waiting, the wait must still
   * resolve rather than leave the worker asleep indefinitely.
   *
   * The worker must recheck the buffer after waking because a
   * notification does not guarantee that work remains available.
   *
   * @param signal - Optional signal used to cancel the wait, such as
   * during worker shutdown.
   * @returns A promise that resolves when work may be available.
   * @throws An abort-related error if the wait is cancelled.
   */
  waitForWork(signal?: AbortSignal): Promise<void>;
}