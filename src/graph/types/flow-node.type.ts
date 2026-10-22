/**
 * A node is a structural element of a flow that represents a point,
 *  thing, or operation within the flow's progression.
 * is not UI component
  database entity
runtime state
event
decision result
renderer
compiled instruction
 */
export interface FlowNode {
  readonly id: string;

  /**
   * The structural category that determines the fundamental capabilities and constraints
   *  of the node..
   */
  readonly kind: FlowNodeKind;

  /**
   * Semantic meaning of the node.
   * Not every node needs a semantic specialization.
   */
  readonly semantic?: string;

  /**
   * Configuration specific to the node kind.
   * A node's configuration must be valid for its kind.

So we should eventually be able to reason:

kind = DECISION
       ↓
config must satisfy DecisionNodeConfig

rather than:

config: any

That will be important for authoring validation.
   */
  readonly config: FlowNodeConfig;

  /**
   * Scene this node belongs to.
   */
  readonly sceneId: string;
}