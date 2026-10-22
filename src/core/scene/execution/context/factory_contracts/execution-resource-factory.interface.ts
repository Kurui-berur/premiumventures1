import { ExecutionResources } from "../../resources/execution-resources.class";

export interface ExecutionResourceFactory {

    create(

        graphVersion: string,

        flowInstanceId: string,

    ): Promise<ExecutionResources>;

}