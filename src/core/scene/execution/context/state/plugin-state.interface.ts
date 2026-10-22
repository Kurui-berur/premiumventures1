import { FlowPlugin } from 'src/core/plugins/contracts/flow-plugin.interface';

export class PluginState {

    private plugin?: FlowPlugin;

    record(
        plugin: FlowPlugin,
    ): void {

        this.plugin = plugin;

    }

    get():
        FlowPlugin | undefined {

        return this.plugin;

    }

    require():
        FlowPlugin {

        if (!this.plugin) {

            throw new Error(
                'ExecutionState does not contain a FlowPlugin.',
            );

        }

        return this.plugin;

    }

    clear(): void {

        this.plugin = undefined;

    }

}