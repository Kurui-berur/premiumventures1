
/**
 * Thrown when a quarantine batch ID already exists but is
 * associated with different logical quarantine content.
 *
 * Reusing a batch ID with identical content is an idempotent
 * operation and must not throw this error.
 */
export class ObservationQuarantineIdentityConflictError extends Error {
  constructor(
    readonly batchId: string,
  ) {
    super(
      `Quarantine batch ID "${batchId}" already exists with different content.`,
    );

    this.name = 'ObservationQuarantineIdentityConflictError';
  }
}
