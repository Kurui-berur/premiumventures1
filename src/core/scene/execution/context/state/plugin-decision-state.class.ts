import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';

export class PluginDecisionState {

    private decision?: PluginDecision;

    record(
        decision: PluginDecision,
    ): void {

        this.decision = decision;

    }

    get():
        PluginDecision | undefined {

        return this.decision;

    }

    require():
        PluginDecision {

        if (!this.decision) {

            throw new Error(
                'ExecutionState does not contain a PluginDecision.',
            );

        }

        return this.decision;

    }

    clear(): void {

        this.decision = undefined;

    }

}