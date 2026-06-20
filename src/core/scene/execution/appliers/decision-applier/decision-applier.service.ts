import { Injectable } from '@nestjs/common';
import { DecisionApplier } from '../../contracts/decision-applier.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import type { RuntimeWriter } from 'src/core/flow/runtime/contracts/flow-writer.interface';

@Injectable()
export class DefaultDecisionApplier implements DecisionApplier {

    constructor(
        private readonly runtime:RuntimeWriter
    ){}
   async apply(frame: ExecutionFrame, decision: PluginDecision): Promise<void> {

       const nodeStates=new Map

       const state={
        ...frame.state
       }
       decision.nodeStatePatch?.forEach((patch,id)=>{
        state.nodeStates.set(id,{
            ...state.nodeStates.get(id),
            ...patch
        })
       })

       decision.sceneStatePatch?.forEach((patch,id)=>{
        state.sceneStates.
       })
    }
}
