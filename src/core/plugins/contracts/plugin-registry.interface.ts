import type {
FlowPlugin
}
from './flow-plugin.interface';

export interface PluginRegistry {

resolve(pluginId:string): Promise<FlowPlugin>;

}