export interface FlowSession {

  flowId: string;

  graphVersion: string;

  graph: RenderGraph;

  runtime: RuntimeState;

}