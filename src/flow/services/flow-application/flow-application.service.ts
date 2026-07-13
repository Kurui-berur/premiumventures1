import { Inject, Injectable } from '@nestjs/common';
import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { FlowRuntimeState } from 'src/core/flow/runtime/state/flow-runtime-state';
import { FlowApplication } from 'src/flow/contracts/flow-application.interface';
import { FlowSession } from 'src/flow/models/flow-session.interface';
import type { FlowLoaderPort } from 'src/flow/ports/flow-loader.port';
import type { RuntimeSnapshotPort } from 'src/flow/ports/runtime-snapshot.port';
import { FLOW_LOADER, RUNTIME_SNAPSHOT_PORT } from 'src/flow/tokens/flow-tokens';

@Injectable()
export class FlowApplicationService implements FlowApplication{
       constructor(
        @Inject(FLOW_LOADER)
        private readonly loader:FlowLoaderPort,
         
        @Inject(RUNTIME_SNAPSHOT_PORT)
        private readonly runtimesnapshot:RuntimeSnapshotPort,

        @Inject(FLOW_DISPATCH) 
        private readonly dispatch:FlowDispatchPort

       ){

       }
   async  dispatch(flowId: string, event: SceneEvent): Promise<FlowRuntimeState> {
        
    }

   async  open(flowId: string): Promise<FlowSession> {

    return this.loader.load(flowId)
       
    }
    async snapshot(flowId: string): Promise<FlowRuntimeState> {

        return this.runtimesnapshot.get(flowId)
    }
    
}
