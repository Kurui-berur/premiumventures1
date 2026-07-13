import { ExecutionScope } from "../../../types/execution-scope.type";
import { ExecutionScopeState } from "../../state/execution-scope-state.contract";

export class ScopeMetadata {

  private readonly scopeStack:
    ExecutionScopeState[] = [];

     enterScope(

    scope: ExecutionScope

  ): ExecutionScopeState {

    const state:
      ExecutionScopeState = {

        id: crypto.randomUUID(),

        scope,

        startedAt:
          Date.now()

      };

    this.scopeStack.push(
      state
    );

    return state;

  }

  leaveScope():
    ExecutionScopeState {

    const scope =
      this.scopeStack.pop();

    if (!scope) {

      throw new Error(
        'ExecutionMetadata does not contain an active scope.'
      );

    }

    return scope;

  }

  currentScope():
    ExecutionScopeState | undefined {

    return this.scopeStack[
      this.scopeStack.length - 1
    ];

  }

  requireScope():
    ExecutionScopeState {

    const scope =
      this.currentScope();

    if (!scope) {

      throw new Error(
        'ExecutionMetadata does not contain an active scope.'
      );

    }

    return scope;

  }

  

}