import { InputBindingSource } from "./input-binding-source.interface";
import { NodeFieldReference } from "./node-field-reference/node-field-reference.interface";

/**
 * Connects a source of data to an input Field
 * of a particular FlowNode.
 *
 * Describes the data relationship, not the runtime value.
 *
 * Each target input Field may have at most one
 * InputBinding within a FlowDefinition.
 */
export interface InputBinding {
  /** Identifies the source of the input value. */
  source: InputBindingSource;

  /** Identifies the destination FlowNode and its input Field. */
  target: NodeFieldReference;
}