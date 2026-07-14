import { FlowRuntimeStatePatch } from "src/core/flow/runtime/contracts/runtime-state-patch.interface";

export class RuntimeDiff {

  constructor(
    readonly patch: Readonly<FlowRuntimeStatePatch>
  ) {}

  isEmpty(): boolean {

    return Object.values(this.patch)
      .every(value => value === undefined);

  }

}