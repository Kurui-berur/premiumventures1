export type FlowEvent<TType extends string = string,TPayload = unknown,> = {
  /**
   * Unique event identifier
   * Used for idempotency
   */
  id: string;

  /**
   * Event type
   */
  type: TType;

  /**
   * Event payload
   */
  payload: TPayload;

  /**
   * Event creation timestamp
   */
  timestamp: number;

  /**
   * Optional metadata
   */
  meta?: {
    source?: string;
    correlationId?: string;
    userId?: string;
  };
};