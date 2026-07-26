import { ProjectionReader } from "src/core/flow/projection/contracts/projection-reader/projection-reader.interface";
import { ProjectionRuntimeReader } from "src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface";

export interface CompositionFrame {

    readonly runtime:
        ProjectionRuntimeReader;

    readonly projection:
        ProjectionReader;

}