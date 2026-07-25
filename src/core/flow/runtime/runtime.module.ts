import { Module } from '@nestjs/common';
import { SceneBootstrapperService } from './bootstraper/scene-bootstrapper/scene-bootstrapper.service';
import { InMemorySceneEventBusService } from '../../events/in-memory-scene-event-bus/in-memory-scene-event-bus.service';
import { DefaultRuntimeSnapshotService } from './services/default-runtime-snapshot/default-runtime-snapshot.service';
import { FLOW_IDENTITY, RUNTIME_CHANGE_DETECTOR, RUNTIME_COORDINATOR, RUNTIME_PATCH_BUILDER, RUNTIME_READER, RUNTIME_RECOVERY_COORDINATOR, RUNTIME_SNAPSHOT, RUNTIME_SNAPSHOT_READER, RUNTIME_STORE, RUNTIME_TRACKER, RUNTIME_WRITER } from './tokens/runtime-tokens';
import { InMemoryFlowRuntimeStoreService } from './store/in-memory-flow-runtime-store/in-memory-flow-runtime-store.service';
import { DefaultRuntimeTrackerService } from './tracking/default-runtime-tracker/default-runtime-tracker.service';
import { DefaultRuntimeReaderService } from './services/default-runtime-reader/default-runtime-state-reader.service';
import { DefaultRuntimeWriterService } from './services/default-runtime-writer/default-runtime-writer.service';
import { DefaultRuntimePatchBuilderService } from './services/default-runtime-patch-builder/default-runtime-patch-builder.service';
import { DefaultRuntimeCoordinatorService } from './coordinator/default-runtime-coordinator/default-runtime-coordinator.service';
import { DefaultRuntimeSnapshotReaderService } from './snapshot/default-runtime-snapshot-reader/default-runtime-snapshot-reader.service';
import { DefaultRuntimeRecoveryCoordinatorService } from './recovery/default-runtime-recovery-coordinator/default-runtime-recovery-coordinator.service';
import { DefaultFlowIdentityReaderService } from './services/default-flow-identity-reader/default-flow-identity-reader.service';
import { DefaultRuntimeViewProviderService } from './services/default-runtime-view-provider/default-runtime-view-provider.service';
import { DefaultRuntimeChangeDetectorService } from './services/default-runtime-change-detector/default-runtime-change-detector.service';
import { DefaultRuntimeReaderService } from './readers/default-runtime-state-reader/default-runtime-reader.service';
import { DefaultProjectionRuntimeService } from './readers/default-projection-runtime/default-projection-runtime.service';

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

      DefaultRuntimeSnapshotReaderService,

      DefaultRuntimeRecoveryCoordinatorService,

      DefaultFlowIdentityReaderService,

      DefaultRuntimeChangeDetectorService,

{

provide:
RUNTIME_CHANGE_DETECTOR,

useExisting:
DefaultRuntimeChangeDetectorService

},

      {

      provide:
      FLOW_IDENTITY,

      useExisting:
      DefaultFlowIdentityReaderService

      },

      {

      provide:
      RUNTIME_RECOVERY_COORDINATOR,

      useExisting:
      DefaultRuntimeRecoveryCoordinatorService

      },

      {
      provide:
      RUNTIME_SNAPSHOT_READER,

      useExisting:
      DefaultRuntimeSnapshotReaderService
      },

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
DefaultRuntimeSnapshotReaderService,
DefaultRuntimeRecoveryCoordinatorService,
DefaultRuntimeViewProviderService,
DefaultRuntimeChangeDetectorService,
DefaultProjectionRuntimeService,

        
       
      ],
  imports: [

    
  ],
})
export class RuntimeModule {}
