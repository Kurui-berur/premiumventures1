export const EngineModule = {

    EXECUTION: "EXECUTION",

    PROJECTION: "PROJECTION",

    COMPOSITION: "COMPOSITION",

    RUNTIME: "RUNTIME",

    DECISION: "DECISION",

    RECOVERY: "RECOVERY",

} as const;
export type EngineModule =
    (typeof EngineModule)[keyof typeof EngineModule];