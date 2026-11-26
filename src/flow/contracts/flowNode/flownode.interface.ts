
/**
 * Represents a particular use of a reusable NodeDefinition
 * within a FlowDefinition.
 *
 * Multiple FlowNodes may reference the same NodeDefinition.
 * Each FlowNode has its own identity within the FlowDefinition.
 */
export interface FlowNode {
  /**
   * Unique identity of this Node use within the FlowDefinition.
   */
  id: string;

  /**
   * Identifies the reusable NodeDefinition whose responsibility
   * this FlowNode uses.
   */
  nodeDefinitionId: string;

  /**
   * Indicates whether this FlowNode is an entry point
   * at which FlowInstance execution may begin.
   */
  isEntryPoint?: boolean;

  /**
   * Indicates whether successful completion of this FlowNode
   * completes the FlowInstance.
   */
  isTerminalPoint?: boolean;
}
