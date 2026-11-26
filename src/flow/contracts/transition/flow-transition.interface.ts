
/**
 * Represents an execution transition between two FlowNodes
 * within a FlowDefinition.
 *
 * A transition is activated by a specific outcome produced
 * by its source FlowNode.
 *
 * The transition belongs to the FlowDefinition because
 * execution progression is specific to the composed Flow,
 * not to the reusable NodeDefinition.
 */
export interface FlowTransition {
  /**
   * Unique identity of this transition within the FlowDefinition.
   */
  id: string;

  /**
   * Identifies the FlowNode whose execution produces
   * the outcome that activates this transition.
   */
  sourceNodeId: string;

  /**
   * Identifies the outcome declared by the source FlowNode's
   * NodeDefinition that activates this transition.
   */
  outcomeId: string;

  /**
   * Identifies the FlowNode to which execution proceeds
   * when this transition is activated.
   */
  targetNodeId: string;
}
