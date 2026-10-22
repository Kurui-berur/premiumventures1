import { Observation } from "../../observation/observation.interface";

/**
 * Defines the contract for validating observations before acceptance
 * into the observability delivery pipeline.
 *
 * Validation includes checking that the observation contains
 * structurally valid data and a payload that conforms to the
 * JSON-compatible data contract.
 *
 * Implementations must not mutate the supplied observation.
 */
export interface ObservationValidator {
  /**
   * Validates an observation against the observability data contract.
   *
   * The method returns normally when the observation is valid.
   * It throws an appropriate validation error when the observation
   * violates the contract.
   *
   * Validation must reject unsupported runtime values, including
   * circular references, non-finite numbers, and unsupported object
   * instances that cannot be represented reliably as JSON.
   *
   * @param observation - The observation to validate.
   * @throws An observation validation error when the observation
   * does not satisfy the required data contract.
   */
  validate(observation: Observation): void;
}