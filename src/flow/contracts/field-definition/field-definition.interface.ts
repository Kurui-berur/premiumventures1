import { FieldDataType } from "./field-data-type.interface";


/**
 * Defines a piece of information associated with a NodeDefinition.
 *
 * A Field describes information that the Node receives or produces.
 * Its identity is local to its owning NodeDefinition.
 *
 * The definition describes the information contract, not its runtime
 * value, source, destination, or the event that triggers execution.
 */
export interface FieldDefinition {
  /**
   * Unique identifier of this Field within its NodeDefinition.
   */
  id: string;

  /**
   * Human-readable name of the Field.
   */
  name: string;

  /**
   * Direction of information relative to the Node.
   *
   * INPUT: information the Node receives.
   * OUTPUT: information the Node produces.
   */
  direction: "INPUT" | "OUTPUT";

  /**
   * Describes the expected data structure of the Field's value.
   */
  dataType: FieldDataType;
}