import { EngineLogEntry }
from '../logs/engine-log-entry.interface';

export interface ExecutionJournal {

  record(
    entry:
    EngineLogEntry
  ): Promise<void>;

  /**
 * Read execution history
 */
entries():
Promise<
readonly EngineLogEntry[]
>;

}