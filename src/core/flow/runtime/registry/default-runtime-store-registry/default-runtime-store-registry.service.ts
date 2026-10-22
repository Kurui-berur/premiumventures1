import { Injectable } from '@nestjs/common';
import { RuntimeStoreRegistry } from '../../contracts/registry/runtime-store-registry.interface';
import { RuntimeStore } from '../../contracts/runtime-store.interface';

@Injectable()
export class DefaultRuntimeStoreRegistryService implements RuntimeStoreRegistry {
    private readonly stores=new Map<string,RuntimeStore>()

   async register(flowInstanceId: string, store: RuntimeStore): Promise<void> {
        this.stores.set(flowInstanceId,store)
    }
    async resolve(flowInstanceId: string): Promise<RuntimeStore> {
        const store=this.stores.get(flowInstanceId)
        if(!store){
            throw new Error(

                `RuntimeStore not found for flow instance '${flowInstanceId}'.`,

            );
        }
        return store
    }
    async unregister(flowInstanceId: string): Promise<boolean> {
        return this.stores.delete(flowInstanceId)
    }
}
