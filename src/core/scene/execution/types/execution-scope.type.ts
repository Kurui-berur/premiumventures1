export const ExecutionScope = {
  PLUGIN: 'PLUGIN',
  DECISION_PATCH: 'DECISION_PATCH',
  TRANSITION: 'TRANSITION',
  RUNTIME: 'RUNTIME',
} as const;

export type ExecutionScope =
  (typeof ExecutionScope)[keyof typeof ExecutionScope];