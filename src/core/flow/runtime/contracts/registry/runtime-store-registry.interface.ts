import { RuntimeStore } from "../runtime-store.interface";

export interface RuntimeStoreRegistry {

    register(

        flowInstanceId: string,

        store: RuntimeStore,

    ): Promise<void>;

    resolve(

        flowInstanceId: string,

    ): Promise<RuntimeStore>;

    unregister(

        flowInstanceId: string,

    ): Promise<boolean>;

}