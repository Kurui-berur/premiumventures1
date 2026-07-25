import { Module } from '@nestjs/common';
import { FlowLoaderService } from './services/flow-loader/flow-loader.service';
import { RuntimeSnapshotServiceService } from './services/runtime-snapshot-service/runtime-snapshot-service.service';
import { FlowApplicationService } from './services/flow-application/flow-application.service';
import { RUNTIME_READER } from 'src/core/flow/runtime/tokens/runtime-tokens';
import { FLOW_LOADER, GRAPH_LOADER, RUNTIME_PORT_READER } from './tokens/flow-tokens';
import { DefaultFlowSessionService } from './flow-session/default-flow-session/default-flow-session.service';

@Module({
  providers: [
    FlowLoaderService,
     RuntimeSnapshotServiceService, 

     FlowApplicationService,
   

{
 provide:
   FLOW_LOADER,

 useClass:
   FlowLoaderService
},
   

DefaultFlowSessionService,





]
    
})
export class FlowModule {}
