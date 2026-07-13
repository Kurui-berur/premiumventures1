import { ExecutionFrame } from "../contracts/execution-frame.interface";
import { ExecutionState } from "./execution-state.class";
import { ExecutionMetadata } from "./metadata/execution-metadata.class";
import { ExecutionRuntime } from "./runtime/execution-runtime.class";

export class ExecutionSession {




  constructor(

    readonly frame:
      ExecutionFrame,
      readonly state:
      ExecutionState,
      readonly metadata:
      ExecutionMetadata,
      readonly runtime:
      ExecutionRuntime

  ) {}

}