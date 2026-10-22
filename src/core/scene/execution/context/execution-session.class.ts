import { ExecutionFrame } from "../contracts/execution-frame.interface";
import { ExecutionState } from "./execution-state.class";
import { ExecutionMetadata } from "./metadata/execution-metadata.class";
import { ExecutionRuntime } from "./runtime/execution-runtime.class";

export class ExecutionSession {


  constructor(

      readonly frame: ExecutionFrame,
      readonly state: ExecutionState, //
      readonly metadata: ExecutionMetadata, //This is not part of the flow's domain state. It is information about the execution itself.
      readonly runtime: ExecutionRuntime // the working runtime Remember: frame.runtime was: the runtime as execution found it at the beginning. Whereas:session.runtime is the runtime that execution can work with as it progresses.

  ) {}

}