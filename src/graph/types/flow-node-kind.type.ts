export const FlowNodeKind = {
  input: 'input',
  action: 'action',
  choice: 'choice',} as const;

export type FlowNodeKind =
  (typeof FlowNodeKind)[keyof typeof FlowNodeKind];