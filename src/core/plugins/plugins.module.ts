import { Module } from '@nestjs/common';
import { DefaultPluginRegistryService } from './services/default-plugin-registry/default-plugin-registry.service';
import { PLUGIN_REGISTRY } from './tokens/plugins.tokens';
import { DefaultOperationResolverService } from './resolvers/default-operation-resolver/default-operation-resolver.service';
import { DefaultDecisionSelectorService } from './decision/default-decision-selector/default-decision-selector.service';

@Module({
  providers: [DefaultPluginRegistryService,
   {
      provide:PLUGIN_REGISTRY,

      useClass:DefaultPluginRegistryService
    },
   DefaultOperationResolverService,
   DefaultDecisionSelectorService
  ],
  exports: [PLUGIN_REGISTRY]
})
export class PluginsModule {}
