import { FlowEvent } from "./flow-event";
import { FlowState } from "./flow-state";

export type FlowHistoryEntry = {
  from: FlowState;
  to: FlowState;
  event: FlowEvent;
  at: number;
};