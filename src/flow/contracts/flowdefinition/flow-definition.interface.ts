import { FlowNode } from "../flowNode/flownode.interface";
import { InputBinding } from "../input-bindings/input-binding.interface";
import { NodeDefinition } from "../node-definition/node-definition.interface";
import { SceneDefinition } from "../scenedefinition/scene-definition.interface";
import { FlowTransition } from "../transition/flow-transition.interface";

/**
 * Defines a reusable domain-authored flow.
 *
 * FlowDefinition brings together reusable NodeDefinitions,
 * Flow-specific Node uses, Scene groupings, execution
 * transitions and input data bindings.
 *
 * PV interprets and coordinates this definition without
 * owning the domain-specific responsibilities of its Nodes.
 */
export interface FlowDefinition {
  /** Unique identity of the FlowDefinition. */
  id: string;

  /** Version of the FlowDefinition. */
  version: number;

  /** Human-readable name of the FlowDefinition. */
  name: string;

  /** Reusable NodeDefinitions referenced by this Flow. */
  nodeDefinitions: NodeDefinition[];

  /** Flow-specific uses of the reusable NodeDefinitions. */
  nodes: FlowNode[];

  /** Logical groupings of FlowNodes within the Flow. */
  scenes: SceneDefinition[];

  /** Execution transitions between FlowNodes. */
  transitions: FlowTransition[];

  /** Connections between input Fields and their data sources. */
  inputBindings: InputBinding[];
}