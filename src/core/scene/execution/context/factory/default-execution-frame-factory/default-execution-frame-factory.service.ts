import { Inject, Injectable } from '@nestjs/common';
import type { RuntimeResolutionPipeline } from 'src/core/flow/runtime/contracts/pipelines/runtime-resolution-pipeline.interface';
import { ExecutionFrame } from '../../../contracts/execution-frame.interface';
import { ExecutionRequest } from '../../contracts/execution-request.interface';
import { RUNTIME_RESOLUTION_PIPELINE } from 'src/core/flow/runtime/tokens/pipelines/runtime-pipeline.tokens';
import { ExecutionFrameFactory } from '../../factory_contracts/execution-frame-factory.interface';
import type { GraphResolutionPipeline } from 'src/graph/graph-core/contracts/pipelines/graph-resolution-pipeline.interface';
import { GRAPH_RESOLUTION_PIPELINE } from 'src/graph/tokens/pipelines/graph-pipelines.tokens';
import { ExecutionResources } from '../../../resources/execution-resources.class';

@Injectable()
export class DefaultExecutionFrameFactoryService implements ExecutionFrameFactory{
    constructor(

        @Inject(GRAPH_RESOLUTION_PIPELINE)
        private readonly graphPipeline:GraphResolutionPipeline,

        @Inject(RUNTIME_RESOLUTION_PIPELINE)
        private readonly runtimePipeline:RuntimeResolutionPipeline,

    ){}
    async create(request: ExecutionRequest,resources:ExecutionResources): Promise<ExecutionFrame> {

 
           return {

            executionId:
                request.executionId,

            flowId:
                request.flowId,

            flowInstanceId:
                request.flowInstanceId,
                 

            graph:
                resources.graph,

            runtime:
                resources.runtime,

            event:
                request.event,

            mode:
                request.mode,

            timestamp:
                request.timestamp,

        };

       
    }
}
