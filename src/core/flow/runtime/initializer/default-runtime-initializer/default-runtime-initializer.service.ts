import { Inject, Injectable } from '@nestjs/common';
import { RuntimeInitializer } from '../../contracts/initializers/runtime-initializer.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import type { RuntimeStoreFactory } from '../../contracts/factory/runtime-store-factory.interface';
import type { RuntimeStoreRegistry } from '../../contracts/registry/runtime-store-registry.interface';
import { RUNTIME_STORE_FACTORY } from '../../tokens/factory/runtime-factory.tokens';
import { RUNTIME_STORE_REGISTRY } from '../../tokens/registry/runtime-registry.tokens';

@Injectable()
export class DefaultRuntimeInitializerService implements RuntimeInitializer{
    constructor(
        @Inject(RUNTIME_STORE_FACTORY)
        private readonly factory:RuntimeStoreFactory,

        @Inject(RUNTIME_STORE_REGISTRY)
        private readonly registry:RuntimeStoreRegistry,
    ){}
    async initialize(flowInstanceId: string, initialState: FlowRuntimeState): Promise<void> {
        const store =await this.factory.create()

        await store.replace(initialState)

        await this.registry.register(flowInstanceId,store)
    }
}
