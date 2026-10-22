import { RuntimeStore } from "./runtime-store.interface";

export interface RuntimeStateResolver{
    resolve(flowInstanceId:string):Promise<RuntimeStore>
}