import { Injectable } from '@nestjs/common';
import { FlowPlugin } from '../../contracts/flow-plugin.interface';
import { PluginRegistry } from '../../contracts/plugin-registry.interface';

@Injectable()
export class DefaultPluginRegistryService implements PluginRegistry {
    private readonly pluginMap = new Map<string, FlowPlugin>();

    constructor(
        private readonly plugins: readonly FlowPlugin[] 
    ) {
        for (const plugin of plugins){

            this.pluginMap.set(plugin.id, plugin);

        }

    }

  async resolve(pluginId: string): Promise<FlowPlugin> {

    const plugin=this.pluginMap.get(pluginId);

    if(!plugin){
        throw new Error(`Plugin with id ${pluginId} not found`);
    }
   
    return plugin;
  }
  
}
