import {
Injectable
}
from '@nestjs/common';
import { PluginRegistry } from '../../contracts/plugin-registry.interface';
import { FlowPlugin } from 'src/core/plugins/contracts/flow-plugin.interface';
import { ExecutionContext } from '../../context/execution-context.class';

@Injectable()
export class DefaultPluginRegistryService implements PluginRegistry {

private readonly plugins =new Map<string,FlowPlugin>();

constructor(

plugins:readonly FlowPlugin[]

){

for(const plugin of plugins
){

this.plugins.set(plugin.id,plugin);

}

}

async resolve(
executionContext: ExecutionContext

){
 const pluginId =executionContext.frame.pluginId

const plugin =this.plugins.get(pluginId);

if(
!plugin
){

throw new Error(
`Plugin not found`
);

}

return plugin;

}

}