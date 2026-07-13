export interface ExecutionDeduplicator {

  exists(
    executionId: string
  ): Promise<boolean>;

  mark(
    executionId: string
  ): Promise<void>;

}