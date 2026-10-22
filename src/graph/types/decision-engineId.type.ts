export const DecisionEngineId = {
    BUSINESS: "business",
    RECOVERY: "recovery",
    SECURITY: "security",
} as const;

export type DecisionEngineId =
    (typeof DecisionEngineId)[keyof typeof DecisionEngineId];