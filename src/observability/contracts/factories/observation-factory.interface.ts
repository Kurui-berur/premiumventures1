import { ObservationInput } from "../observation/observation-input.interface";
import { Observation } from "../observation/observation.interface";

/**
 * Constructs observations from producer-supplied occurrence facts.
 *
 * The factory owns construction of the observation representation.
 * It does not determine whether an occurrence is architecturally
 * meaningful, nor does it infer execution semantics or causality.
 */
export interface ObservationFactory {
  /**
   * Creates an observation from producer-supplied facts.
   *
   * @typeParam TPayload - The type of data carried by the observation.
   *
   * @param input - Semantic facts supplied by the producer.
   *
   * @returns The constructed observation.
   */
  create<TPayload >(
    input: ObservationInput<TPayload>,
  ): Observation<TPayload>;
}