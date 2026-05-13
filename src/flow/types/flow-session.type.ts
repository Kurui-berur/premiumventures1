import { FlowHistoryEntry } from "./flow-history-entry.type";
import { FlowState } from "./flow-state";

export type FlowSession = {
  sessionId: string;

  state: FlowState;

  context: Record<string, any>;

  /**
   * Optimistic concurrency control
   */
  version: number;

  /**
   * Idempotency tracking
   */
  processedEvents: string[];

  /**
   * Audit trail
   */
  history: FlowHistoryEntry[];

  updatedAt: number;
};