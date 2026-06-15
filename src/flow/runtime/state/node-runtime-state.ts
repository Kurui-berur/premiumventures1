export interface NodeRuntimeState {

  nodeId: string;

  visible: boolean;

  interacted: boolean;

  completed: boolean;
  data?: {
    value?: unknown;
    submitted?: boolean;
    [key: string]: unknown;
  };
}