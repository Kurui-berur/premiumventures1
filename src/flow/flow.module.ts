import { Module } from '@nestjs/common';
import { FlowLoaderService } from './services/flow-loader/flow-loader.service';
import { RuntimeSnapshotServiceService } from './services/runtime-snapshot-service/runtime-snapshot-service.service';
import { FlowApplicationService } from './services/flow-application/flow-application.service';
import { RUNTIME_READER } from 'src/core/flow/runtime/tokens/runtime-tokens';
import { FLOW_LOADER, GRAPH_LOADER, RUNTIME_PORT_READER } from './tokens/flow-tokens';
import { DefaultFlowSessionService } from './flow-session/default-flow-session/default-flow-session.service';
import { DefaultFlowSessionDescriptorFactoryService } from './factory/descriptors/default-flow-session-descriptor-factory/default-flow-session-descriptor-factory.service';
import { DefaultFlowSessionFactoryService } from './factory/default-flow-session-factory/default-flow-session-factory.service';
import { DefaultFlowSessionExecutorService } from './executors/default-flow-session-executor/default-flow-session-executor.service';
import { DefaultCompositionPipelineService } from './pipelines/default-composition-pipeline/default-composition-pipeline.service';
import { DefaultCompositionSessionFactoryService } from './factory/default-composition-session-factory/default-composition-session-factory.service';
import { DefaultCompositionService } from './services/default-composition/default-composition.service';

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
   

DefaultFlowSessionDescriptorFactoryService,
   

DefaultFlowSessionFactoryService,
   

DefaultFlowSessionExecutorService,
   

DefaultCompositionPipelineService,
   

DefaultCompositionSessionFactoryService,
   

DefaultCompositionService,





]
    
})
export class FlowModule {}
