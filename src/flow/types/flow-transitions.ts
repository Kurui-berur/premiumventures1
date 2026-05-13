export type FlowTransition<TState = string, TEvent = string> = {
  from: TState;
  event: TEvent;
  to: TState;
};
