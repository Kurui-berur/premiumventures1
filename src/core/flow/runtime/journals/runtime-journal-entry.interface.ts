export interface RuntimeJournalEntry {

  flowId: string;

  timestamp: number;

  stage:
    | 'STATE_REPLACED'
    | 'PATCH_APPLIED';

  payload?: unknown;

}