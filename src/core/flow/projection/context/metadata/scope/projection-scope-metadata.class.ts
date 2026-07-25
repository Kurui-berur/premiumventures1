import { ProjectionScope } from "../../../types/projection-scope.types";
import { ProjectionScopeState } from "./projection-scope-state.interface";

export class ProjectionScopeMetadata {
    private readonly ScopeStack:ProjectionScopeState[]=[]

    enterScope(
        scope:ProjectionScope
    ):ProjectionScopeState{

        const state:ProjectionScopeState={
            id:crypto.randomUUID(),
            scope,
            startedAt:Date.now()
        }
        this.ScopeStack.push(state)

        return state
    }

    leaveScope():ProjectionScopeState{

        const scope=this.ScopeStack.pop()

        if(!scope){
            throw new Error(
        'ProjectionMetadata does not contain an active scope.'
      );

        }
        return scope

    }

    currentScope():ProjectionScopeState | undefined{

    return this.ScopeStack[this.ScopeStack.length-1]

    }

    requireScope():ProjectionScopeState{
        const scope=
        this.currentScope()
        if(!scope){
        throw new Error(
        'ProjectionMetadata does not contain an active scope.'
      );
        }
        return scope
    }


}