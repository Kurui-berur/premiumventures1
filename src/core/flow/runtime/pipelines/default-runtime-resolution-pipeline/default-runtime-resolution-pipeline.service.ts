import { Inject, Injectable } from '@nestjs/common';
import { RuntimeResolutionPipeline } from '../../contracts/pipelines/runtime-resolution-pipeline.interface';
import { RuntimeStore } from '../../contracts/runtime-store.interface';
import type { RuntimeStoreRegistry } from '../../contracts/registry/runtime-store-registry.interface';
import { RUNTIME_STORE_REGISTRY } from '../../tokens/registry/runtime-registry.tokens';
import { DefaultRuntimeStateReader } from '../../services/default-runtime-reader/default-runtime-state-reader.service';
import { DefaultProjectionRuntimeReader } from '../../readers/default-projection-runtime/default-projection-runtime.service';
import { ProjectionRuntimeReader } from '../../contracts/reader/projection-runtime-reader.interface';

@Injectable()
export class DefaultRuntimeResolutionPipelineService implements RuntimeResolutionPipeline{
    constructor(
        @Inject(RUNTIME_STORE_REGISTRY)
        private readonly registry:RuntimeStoreRegistry,
    ){}
    async execute(flowInstanceId: string): Promise<ProjectionRuntimeReader> {
        
        const store=await this.registry.resolve(flowInstanceId)

        const reader=new DefaultRuntimeStateReader(store)

        return new DefaultProjectionRuntimeReader(reader)

    }
}
