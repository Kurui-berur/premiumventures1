/**
 * Represents an attempt to reuse an observation ID for an observation
 * whose logical content differs from the observation already stored
 * under that ID.
 *
 * Observation IDs identify logical observations and must not be reused
 * for different observation content.
 *
 * This error allows callers to distinguish an observation identity
 * violation from transient persistence failures.
 *
 * Retrying the same conflicting observation without changing the
 * underlying data will not resolve this error.
 */
export class ObservationIdentityConflictError extends Error {
  /**
   * Creates an observation identity conflict error.
   *
   * @param observationId - The ID of the observation whose existing
   * identity conflicts with the incoming observation's content.
   */
  constructor(
    readonly observationId: string,
  ) {
    super(
      `Observation ID "${observationId}" already exists with different content.`,
    );

    this.name = 'ObservationIdentityConflictError';
  }
}