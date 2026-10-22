/**
 * Represents an attempt to persist an observation at a stream position
 * that is already occupied by a different observation.
 *
 * A stream position is uniquely identified by the combination of
 * scope ID, stream ID, and sequence number.
 *
 * Two observations cannot occupy the same stream position when they
 * have different observation IDs, even if their payloads are identical.
 *
 * This error allows callers to distinguish a stream-position
 * constraint violation from transient persistence failures.
 *
 * Retrying the same conflicting observation without resolving the
 * position conflict will not resolve this error.
 */
export class ObservationStreamPositionConflictError extends Error {
  /**
   * Creates a stream-position conflict error.
   *
   * @param scopeId - The scope containing the conflicting stream.
   * @param streamId - The identifier of the stream within the scope.
   * @param sequence - The sequence number of the conflicting position.
   * @param existingObservationId - The ID of the observation already
   * occupying the stream position.
   * @param incomingObservationId - The ID of the incoming observation
   * attempting to occupy the same position.
   */
  constructor(
    readonly scopeId: string,
    readonly streamId: string,
    readonly sequence: number,
    readonly existingObservationId: string,
    readonly incomingObservationId: string,
  ) {
    super(
      `Stream position conflict: scope="${scopeId}", stream="${streamId}", sequence=${sequence}.`,
    );

    this.name = 'ObservationStreamPositionConflictError';
  }
}