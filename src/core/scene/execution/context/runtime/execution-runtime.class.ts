import { FlowRuntimeState } from "src/core/flow/runtime/state/flow-runtime-state";

export class ExecutionRuntime {

  constructor(

    private runtimeState:
      FlowRuntimeState

  ) {}

  current():
  Readonly<FlowRuntimeState> {

    return this.runtimeState;

  }

  replace(
    runtimeState: FlowRuntimeState
  ): void {

    this.runtimeState = runtimeState;

  }

}