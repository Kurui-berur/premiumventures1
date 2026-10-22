export interface DecisionRequest {
    readonly decisionNodeId: string;
    readonly decisionType: string;
    readonly decisionConfig?: unknown;
    readonly input: unknown;
}