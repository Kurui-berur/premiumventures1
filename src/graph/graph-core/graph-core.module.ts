import { Module } from '@nestjs/common';
import { GraphReaderService } from './services/graph-reader/graph-reader.service';
import { DefaultDecisionNodeGuardService } from './services/default-decision-node-guard/default-decision-node-guard.service';
import { DefaultGraphResolverService } from './resolvers/default-graph-resolver/default-graph-resolver.service';
import { InMemoryGraphRegistryService } from './registry/in-memory-graph-registry/in-memory-graph-registry.service';
import { GraphResolutionPipelineService } from './pipelines/graph-resolution-pipeline/graph-resolution-pipeline.service';


@Module({
  providers: [GraphReaderService, DefaultDecisionNodeGuardService, DefaultGraphResolverService, InMemoryGraphRegistryService, GraphResolutionPipelineService]
})
export class GraphCoreModule {}
