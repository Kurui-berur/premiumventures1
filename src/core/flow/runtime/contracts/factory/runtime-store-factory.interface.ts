import { RuntimeStore } from "../runtime-store.interface";

export interface RuntimeStoreFactory {

    create(): Promise<RuntimeStore>;

}