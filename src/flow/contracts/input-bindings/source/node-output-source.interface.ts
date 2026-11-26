import { NodeFieldReference } from "../node-field-reference/node-field-reference.interface";

/**
 * Identifies a value produced by an output Field
 * of another FlowNode.
 */
export interface NodeOutputSource {
  /** Identifies this source as another Node's output. */
  kind: "NODE_OUTPUT";

  /** Identifies the source FlowNode and its output Field. */
  reference: NodeFieldReference;
}