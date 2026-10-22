import { Inject, Injectable } from '@nestjs/common';
import { ExecutionResourceFactory } from '../../factory_contracts/execution-resource-factory.interface';
import { ExecutionResources } from '../../../resources/execution-resources.class';
import type { RuntimeResolutionPipeline } from 'src/core/flow/runtime/contracts/pipelines/runtime-resolution-pipeline.interface';
import { RUNTIME_RESOLUTION_PIPELINE } from 'src/core/flow/runtime/tokens/pipelines/runtime-pipeline.tokens';
import type { GraphResolutionPipeline } from 'src/graph/graph-core/contracts/pipelines/graph-resolution-pipeline.interface';
import { GRAPH_RESOLUTION_PIPELINE } from 'src/graph/tokens/pipelines/graph-pipelines.tokens';

@Injectable()
export class DefaultExecutionResourceFactoryService implements ExecutionResourceFactory{

    constructor(
       @Inject(GRAPH_RESOLUTION_PIPELINE)
       private readonly graphPipeline:GraphResolutionPipeline,

        @Inject(RUNTIME_RESOLUTION_PIPELINE)
        private readonly runtimePipeline:RuntimeResolutionPipeline,
    ){}
    async create(graphVersion: string, flowInstanceId: string): Promise<ExecutionResources> {
        
        const graph=await this.graphPipeline.execute(graphVersion)

        const runtime=await this.runtimePipeline.execute(flowInstanceId)

        return new ExecutionResources(
            graph,runtime
        )
    }
}
