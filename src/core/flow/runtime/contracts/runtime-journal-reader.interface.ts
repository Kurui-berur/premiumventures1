import { RuntimeJournalEntry } from "../journals/runtime-journal-entry.interface";

export interface RuntimeJournalReader {

  entries():
  Promise<
    readonly RuntimeJournalEntry[]
  >;

}