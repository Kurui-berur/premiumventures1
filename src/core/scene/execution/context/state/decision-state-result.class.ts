import { DecisionResult } from "../../contracts/decision/decision-result.interface";

export class DecisionResultState {

  private result?: DecisionResult;

  record(result: DecisionResult): void {
    this.result = result;
  }

  current(): DecisionResult | undefined {
    return this.result;
  }

  require(): DecisionResult {
    if (!this.result) {
      throw new Error(
        "No DecisionResult has been recorded."
      );
    }

    return this.result;
  }

  clear(): void {
    this.result = undefined;
  }

}