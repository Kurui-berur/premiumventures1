import { FlowEvent } from "../types/flow-event";
import { FlowState } from "../types/flow-state";

export interface FlowHandler<TState = FlowState, TContext = any> {
    //current state machine entry point
  handle(params: {
    state:TState,
    event: FlowEvent;
    sessionId?:string;
    context?:TContext;
  }): Promise<{
    state:TState,
    context:TContext,
    blocks?:any[]
  }>;
}
