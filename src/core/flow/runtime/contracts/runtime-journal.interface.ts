import { RuntimeLogEntry } from "../logs/runtime-logs-entry.interface";

export interface RuntimeJournal {

  record(
    entry:
    RuntimeLogEntry
  ): Promise<void>;

  entries():
  Promise<
    readonly RuntimeLogEntry[]
  >;

}