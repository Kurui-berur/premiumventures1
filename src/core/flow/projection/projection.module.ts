import { Module } from '@nestjs/common';
import { DefaultProjectionFrameFactoryService } from './context/factory/default-projection-frame-factory/default-projection-frame-factory.service';
import { DefaultSceneSelectionPipelineService } from './pipelines/default-scene-selection-pipeline/default-scene-selection-pipeline.service';
import { DefaultProjectionSeedExecutorService } from './executors/default-projection-seed-executor/default-projection-seed-executor.service';
import { DefaultProjectionSeedPipelineService } from './pipelines/default-projection-seed-pipeline/default-projection-seed-pipeline.service';
import { DefaultProjectionSeedResolverService } from './resolvers/default-projection-seed-resolver/default-projection-seed-resolver.service';
import { DefaultCurrentSceneProjectionStrategyService } from './strategies/default-current-scene-projection-strategy/default-current-scene-projection-strategy.service';
import { DefaultActiveSceneProjectionGraphStrategyService } from './strategies/default-active-scene-projection-graph-strategy/default-active-scene-projection-graph-strategy.service';
import { DefaultProjectionGraphStrategyRegistryService } from './registries/default-projection-graph-strategy-registry/default-projection-graph-strategy-registry.service';
import { DefaultProjectionTrackerService } from './tracker/default-projection-tracker/default-projection-tracker.service';
import { DefaultProjectionGraphPipelineService } from './pipelines/default-projection-graph-pipeline/default-projection-graph-pipeline.service';
import { DefaultProjectionGraphResolverService } from './resolvers/default-projection-graph-resolver/default-projection-graph-resolver.service';
import { DefaultProjectionGraphExecutorService } from './executors/default-projection-graph-executor/default-projection-graph-executor.service';
import { DefaultProjectionEngineService } from './coordination/default-projection-engine/default-projection-engine.service';
import { DefaultProjectionGraphService } from './graph/default-projection-graph/default-projection-graph.service';
import { DefaultProjectionGraphFactoryService } from './factories/default-projection-graph-factory/default-projection-graph-factory.service';
import { DefaultProjectionCandidateNodeSetService } from './nodes/default-projection-candidate-node-set/default-projection-candidate-node-set.service';
import { DefaultProjectionCandidateNodeFactoryService } from './factories/default-projection-candidate-node-factory/default-projection-candidate-node-factory.service';
import { DefaultCandidateNodeSetExecutorService } from './executors/default-candidate-node-set-executor/default-candidate-node-set-executor.service';
import { DefaultProjectionCandidateNodeDescriptorFactoryService } from './factories/default-projection-candidate-node-descriptor-factory/default-projection-candidate-node-descriptor-factory.service';
import { DefaultProjectionCandidateNodePipelineService } from './pipelines/default-projection-candidate-node-pipeline/default-projection-candidate-node-pipeline.service';
import { DefaultProjectNodeSetService } from './nodes/default-project-node-set/default-project-node-set.service';
import { DefaultProjectionNodeDescriptorFactoryService } from './factories/descriptors/default-projection-node-descriptor-factory/default-projection-node-descriptor-factory.service';
import { DefaultProjectionNodeDescriptorService } from './descriptors/default-projection-node-descriptor/default-projection-node-descriptor.service';
import { DefaultProjectionNodeFactoryService } from './factories/nodes/default-projection-node-factory/default-projection-node-factory.service';
import { DefaultProjectionNodeExecutorService } from './executors/default-projection-node-executor/default-projection-node-executor.service';
import { DefaultProjectionNodePipelineService } from './pipelines/default-projection-node-pipeline/default-projection-node-pipeline.service';
import { DefaultFlowViewService } from './nodes/default-flow-view/default-flow-view.service';
import { DefaultSceneViewService } from './nodes/default-scene-view/default-scene-view.service';
import { DefaultFlowViewDescriptorService } from './descriptors/default-flow-view-descriptor/default-flow-view-descriptor.service';
import { DefaultFlowViewDescriptorFactoryService } from './factories/descriptors/default-flow-view-descriptor-factory/default-flow-view-descriptor-factory.service';
import { DefaultFlowViewFactoryService } from './factories/default-flow-view-factory/default-flow-view-factory.service';
import { DefaultFlowViewExecutorService } from './executors/default-flow-view-executor/default-flow-view-executor.service';
import { DefaultFlowViewPipelineService } from './pipelines/default-flow-view-pipeline/default-flow-view-pipeline.service';
import { DefaultProjectionReaderService } from './projection-reader/default-projection-reader/default-projection-reader.service';

@Module({
  providers: [DefaultProjectionFrameFactoryService, DefaultSceneSelectionPipelineService, DefaultProjectionSeedExecutorService, DefaultProjectionSeedPipelineService, DefaultProjectionSeedResolverService, DefaultCurrentSceneProjectionStrategyService, DefaultActiveSceneProjectionGraphStrategyService, DefaultProjectionGraphStrategyRegistryService, DefaultProjectionTrackerService, DefaultProjectionGraphPipelineService, DefaultProjectionGraphResolverService, DefaultProjectionGraphExecutorService, DefaultProjectionEngineService, DefaultProjectionGraphService, DefaultProjectionGraphFactoryService, DefaultProjectionCandidateNodeSetService, DefaultProjectionCandidateNodeFactoryService, DefaultCandidateNodeSetExecutorService, DefaultProjectionCandidateNodeDescriptorFactoryService, DefaultProjectionCandidateNodePipelineService, DefaultProjectNodeSetService, DefaultProjectionNodeDescriptorFactoryService, DefaultProjectionNodeDescriptorService, DefaultProjectionNodeFactoryService, DefaultProjectionNodeExecutorService, DefaultProjectionNodePipelineService, DefaultFlowViewService, DefaultSceneViewService, DefaultFlowViewDescriptorService, DefaultFlowViewDescriptorFactoryService, DefaultFlowViewFactoryService, DefaultFlowViewExecutorService, DefaultFlowViewPipelineService, DefaultProjectionReaderService]
})
export class ProjectionModule {}
