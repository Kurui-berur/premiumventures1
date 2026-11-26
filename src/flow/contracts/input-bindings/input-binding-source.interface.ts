import { FlowContextSource } from "./source/flow-context-source.interface";
import { NodeOutputSource } from "./source/node-output-source.interface";

/**
 * Describes the supported sources from which
 * a Node input Field can receive its value.
 */
export type InputBindingSource =
  | NodeOutputSource
  | FlowContextSource;