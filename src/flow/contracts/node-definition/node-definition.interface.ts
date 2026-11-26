import { FieldDefinition } from "../field-definition/field-definition.interface";
import { CapabilityRequirement } from "../node-capability-requirement/node-capability-requirement.interface";
import { NodeOutcomeDefinition } from "./node-outcome-definition.interface";

/**
 * Defines a reusable Node responsibility within a domain.
 *
 * A NodeDefinition describes the responsibility of a Node,
 * the information it receives and produces, its possible outcomes,
 * and the requirements for executing that responsibility.
 *
 * It is independent of any particular Flow composition or runtime
 * instance. A Flow uses this definition through a FlowNode.
 *
 * PV interprets this contract to coordinate Node execution without
 * needing to understand the domain's business logic.
 */
export interface NodeDefinition {
  /**
   * Unique identifier of this NodeDefinition within its domain.
   */
  id: string;

  /**
   * Version of this NodeDefinition contract.
   */
  version: number;

  /**
   * Human-readable name of the Node responsibility.
   */
  name: string;

  /**
   * Describes the responsibility performed by this Node.
   */
  description: string;

  /**
   * Declares the information this Node receives and produces.
   */
  fields: FieldDefinition[];

  /**
   * Declares the possible outcomes of this Node's responsibility.
   */
  outcomes: NodeOutcomeDefinition[];

  /**
   * Declares the capability required to perform this Node's
   * responsibility, if one is required.
   */
  capability?: CapabilityRequirement;
}