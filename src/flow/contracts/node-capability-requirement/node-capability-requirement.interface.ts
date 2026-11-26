/**
 * Declares a capability contract required by a NodeDefinition.
 *
 * Identifies the capability and the contract version that a
 * compatible domain-provided implementation must fulfil.
 *
 * It does not identify or contain a particular implementation.
 */
export interface CapabilityRequirement {
  /**
   * Stable identifier of the required capability contract.
   */
  capabilityId: string;

  /**
   * Version of the required capability contract.
   */
  contractVersion: number;
}