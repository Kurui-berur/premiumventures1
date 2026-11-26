/**
 * Identifies a value supplied through the FlowInstance context.
 */
export interface FlowContextSource {
  /** Identifies this source as FlowInstance context data. */
  kind: "FLOW_CONTEXT";

  /** Identifies the context entry containing the required value. */
  key: string;
}