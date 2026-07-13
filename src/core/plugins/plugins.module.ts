import { Module } from '@nestjs/common';
import { DefaultPluginRegistryService } from './services/default-plugin-registry/default-plugin-registry.service';
import { PLUGIN_REGISTRY } from './tokens/plugins.tokens';

@Module({
  providers: [DefaultPluginRegistryService,
   {
      provide:PLUGIN_REGISTRY,

      useClass:DefaultPluginRegistryService
    }
  ],
  exports: [PLUGIN_REGISTRY]
})
export class PluginsModule {}
