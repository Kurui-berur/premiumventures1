import { Module } from '@nestjs/common';
import { SceneBootstrapperService } from './bootstraper/scene-bootstrapper/scene-bootstrapper.service';
import { InMemorySceneEventBusService } from '../../events/in-memory-scene-event-bus/in-memory-scene-event-bus.service';
import { DefaultRuntimeSnapshotService } from './services/default-runtime-snapshot/default-runtime-snapshot.service';
import { RUNTIME_COORDINATOR, RUNTIME_PATCH_BUILDER, RUNTIME_READER, RUNTIME_SNAPSHOT, RUNTIME_STORE, RUNTIME_TRACKER, RUNTIME_WRITER } from './tokens/runtime-tokens';
import { InMemoryFlowRuntimeStoreService } from './store/in-memory-flow-runtime-store/in-memory-flow-runtime-store.service';
import { DefaultRuntimeTrackerService } from './tracking/default-runtime-tracker/default-runtime-tracker.service';
import { DefaultRuntimeReaderService } from './services/default-runtime-reader/default-runtime-reader.service';
import { DefaultRuntimeWriterService } from './services/default-runtime-writer/default-runtime-writer.service';
import { DefaultRuntimePatchBuilderService } from './services/default-runtime-patch-builder/default-runtime-patch-builder.service';
import { DefaultRuntimeCoordinatorService } from './coordinator/default-runtime-coordinator/default-runtime-coordinator.service';

@Module({
  providers: [
    SceneBootstrapperService, 

          

     
       InMemorySceneEventBusService,

       DefaultRuntimeSnapshotService,

      InMemoryFlowRuntimeStoreService,

      DefaultRuntimeReaderService,

      DefaultRuntimeWriterService,

      DefaultRuntimeTrackerService,
      DefaultRuntimePatchBuilderService,
      DefaultRuntimeCoordinatorService,

      {
      provide:
      RUNTIME_COORDINATOR,

      useExisting:
      DefaultRuntimeCoordinatorService
      },

      {
      provide:
      RUNTIME_PATCH_BUILDER,

      useExisting:
      DefaultRuntimePatchBuilderService
      },

{
provide:
RUNTIME_STORE,

useExisting:
InMemoryFlowRuntimeStoreService
},

{
provide:
RUNTIME_READER,

useExisting:
DefaultRuntimeReaderService
},

{
provide:
RUNTIME_WRITER,

useExisting:
DefaultRuntimeWriterService
},

{
provide:
RUNTIME_TRACKER,

useExisting:
DefaultRuntimeTrackerService
}
,
{
provide:
RUNTIME_SNAPSHOT,

useExisting:
DefaultRuntimeSnapshotService
},
DefaultRuntimePatchBuilderService,
DefaultRuntimeCoordinatorService,

        
       
      ],
  imports: [

    
  ],
})
export class RuntimeModule {}
