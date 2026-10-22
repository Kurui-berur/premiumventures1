/**
 * SceneEvent is a generic execution event whose payload may contain domain-specific dat
 */
export interface SceneEvent {

    readonly eventId: string;

    /**
     * Identifies what occurred.
     *
     * Examples:
     * - "submit"
     * - "select"
     * - "continue"
     * - "retry"
     *
     * The execution engine does not interpret the meaning.
     */
    readonly type: string;

    /**
     * Domain/application-specific data associated
     * with the occurrence.
     */
    readonly payload: unknown;

    /**
     * Time at which the occurrence was produced.
     */
    readonly timestamp: number;
}