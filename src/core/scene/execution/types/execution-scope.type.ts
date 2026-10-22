export const ExecutionScope = {
  PLUGIN: 'PLUGIN',
  DECISION_PATCH: 'DECISION_PATCH',
  TRANSITION: 'TRANSITION',
  RUNTIME: 'RUNTIME',
  RUNTIME_DIFF:'RUNTIME_DIFF',
  EXECUTION_COMMIT:'EXECUTION_COMMIT',
DECISION_NODE_SELECTION:"DECISION_NODE_SELECTION"
} as const; 

export type ExecutionScope =
  (typeof ExecutionScope)[keyof typeof ExecutionScope];