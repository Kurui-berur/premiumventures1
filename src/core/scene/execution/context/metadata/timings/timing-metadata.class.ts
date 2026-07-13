import { ExecutionScopeTiming } from "../scope/execution-scope-timing.interface";

export class TimingMetadata {

  private readonly timingRegistry =
    new Map<
      string,
      ExecutionScopeTiming
    >();

     recordTiming(
    timing: ExecutionScopeTiming
  ): void {

    this.timingRegistry.set(

      timing.scopeId,

      timing

    );

  }

  timing(
    scopeId: string
  ): ExecutionScopeTiming | undefined {

    return this.timingRegistry.get(
      scopeId
    );

  }

  allTimings():
    readonly ExecutionScopeTiming[] {

    return [

      ...this.timingRegistry.values()

    ];

  }


  
}