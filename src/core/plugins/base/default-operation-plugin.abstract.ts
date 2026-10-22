import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { OperationHandler } from '../contracts/decision/handler/operation-handler.interface';
import { FlowPlugin }
from '../contracts/flow-plugin.interface';



export abstract class DefaultOperationPlugin
implements FlowPlugin {
 
    abstract readonly id: string;

    private readonly handlers =

        new Map<
            string,
            OperationHandler
        >();

    protected register(

        handler: OperationHandler,

    ): void {

        this.handlers.set(

            handler.operation,

            handler,

        );

    }

    resolveOperation(

        operation: string,

    ): OperationHandler {

        const handler =

            this.handlers.get(
                operation,
            );

        if (!handler) {

            throw new Error(

                `Operation '${operation}' is not registered for plugin '${this.id}'.`

            );

        }

        return handler;

    }

}