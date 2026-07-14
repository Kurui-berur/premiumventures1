export const ExecutionScope = {
  PLUGIN: 'PLUGIN',
  DECISION_PATCH: 'DECISION_PATCH',
  TRANSITION: 'TRANSITION',
  RUNTIME: 'RUNTIME',
  RUNTIME_DIFF:'RUNTIME_DIFF',
  EXECUTION_COMMIT:'EXECUTION_COMMIT'
} as const;

export type ExecutionScope =
  (typeof ExecutionScope)[keyof typeof ExecutionScope];