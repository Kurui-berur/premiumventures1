import { Injectable } from '@nestjs/common';
import { RuntimeStoreFactory } from '../../contracts/factory/runtime-store-factory.interface';
import { RuntimeStore } from '../../contracts/runtime-store.interface';
import { InMemoryFlowRuntimeStoreService } from '../../store/in-memory-flow-runtime-store/in-memory-flow-runtime-store.service';

@Injectable()
export class DefaultRuntimeStoreFactoryService implements RuntimeStoreFactory {
    async create(): Promise<RuntimeStore> {
       return new InMemoryFlowRuntimeStoreService()
    }
}
