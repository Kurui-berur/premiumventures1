import { RuntimeDiff } from '../runtime/runtime-diff.class';

export class RuntimeDiffState {

    private runtimeDiff?: RuntimeDiff;

    record(
        runtimeDiff: RuntimeDiff,
    ): void {

        this.runtimeDiff = runtimeDiff;

    }

    get():
        RuntimeDiff | undefined {

        return this.runtimeDiff;

    }

    require():
        RuntimeDiff {

        if (!this.runtimeDiff) {

            throw new Error(
                'ExecutionState does not contain a RuntimeDiff.',
            );

        }

        return this.runtimeDiff;

    }

    clear(): void {

        this.runtimeDiff = undefined;

    }

}