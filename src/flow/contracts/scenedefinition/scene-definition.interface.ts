
/**
 * Represents a logical grouping of FlowNodes
 * within a FlowDefinition.
 *
 * Scene membership does not prescribe Node instantiation,
 * execution order, or simultaneous execution.
 */
export interface SceneDefinition {
  /**
   * Unique identity of this Scene within the FlowDefinition.
   */
  id: string;

  /**
   * Identifies the FlowNodes belonging to this Scene.
   */
  nodeIds: string[];
}
