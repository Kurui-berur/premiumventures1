import { Inject, Injectable } from '@nestjs/common';
import { GraphResolutionPipeline } from '../../contracts/pipelines/graph-resolution-pipeline.interface';
import { GraphReader } from '../../contracts/graph-reader.interface';
import type { GraphResolver } from '../../contracts/resolvers/graph-resolver.interface';
import { GRAPH_RESOLVER } from 'src/graph/tokens/resolvers/graph-resolver.tokens';

@Injectable()
export class GraphResolutionPipelineService implements GraphResolutionPipeline{
    constructor(
         @Inject(GRAPH_RESOLVER)
         private readonly resolver:GraphResolver,
    ){}
   async execute(graphVersion: string): Promise<GraphReader> {
      return this.resolver.resolve(graphVersion)
    }
}
