
import { FlowPlugin } from "src/core/plugins/contracts/flow-plugin.interface";
import { ExecutionSession } from "../context/execution-session.class";


export interface PluginRegistry {

resolve(context: ExecutionSession): Promise<FlowPlugin>;

}