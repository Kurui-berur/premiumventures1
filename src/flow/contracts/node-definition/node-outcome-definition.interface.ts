/**
 * Declares a possible outcome of a Node's responsibility.
 *
 * An outcome identifies a result that can be produced when
 * a Node executes. It does not define the subsequent Flow
 * transition or the implementation that produces the result.
 *
 * Its identity is local to its owning NodeDefinition.
 */
export interface NodeOutcomeDefinition {
  /**
   * Unique identifier of this outcome within its NodeDefinition.
   */
  id: string;

  /**
   * Human-readable name of the outcome.
   */
  name: string;

  /**
   * Explains the meaning of this outcome.
   */
  description: string;
}