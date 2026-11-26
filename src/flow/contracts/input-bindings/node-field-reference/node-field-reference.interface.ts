/**
 * Identifies a Field belonging to a particular FlowNode
 * within a FlowDefinition.
 */
export interface NodeFieldReference {
  /** Identifies the FlowNode that owns the referenced Field. */
  nodeId: string;

  /** Identifies the Field within the referenced NodeDefinition. */
  fieldId: string;
}