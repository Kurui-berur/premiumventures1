import { ProjectionRuntimeReader } from "src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface";
import { GraphReader } from "src/graph/graph-core/contracts/graph-reader.interface";
import { ProjectionIntent } from "../contracts/options/projection-intent.interface.ts";

export interface ProjectionFrame {

  readonly graph:
    GraphReader;

  readonly runtime:
    ProjectionRuntimeReader;

  readonly intent:
    ProjectionIntent;

}