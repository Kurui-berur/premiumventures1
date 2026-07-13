
import { FlowPlugin } from "src/core/plugins/contracts/flow-plugin.interface";
import { ExecutionContext } from "../context/execution-context.class";


export interface PluginRegistry {

resolve(context: ExecutionContext): Promise<FlowPlugin>;

}