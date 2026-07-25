import { Inject, Injectable } from '@nestjs/common';
import { ProjectionNodeExecutor } from '../../contracts/executors/projection-node-executor.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import type { ProjectionNodeDescriptorFactory } from '../../contracts/factories/descriptor-factory/Projection-Node-Descriptor-Factory.interface';
import type { ProjectionNodeFactory } from '../../contracts/factories/projection-node/projection-node-factory.interface';
import { PROJECTION_NODE_DESCRIPTOR_FACTORY, PROJECTION_NODE_FACTORY } from '../../Tokens/factories/projection-factories.tokens';

@Injectable()
export class DefaultProjectionNodeExecutorService implements ProjectionNodeExecutor {

    constructor(
       @Inject( PROJECTION_NODE_DESCRIPTOR_FACTORY)
        private readonly descriptorFactory: ProjectionNodeDescriptorFactory,

        @Inject(PROJECTION_NODE_FACTORY)
        private readonly factory: ProjectionNodeFactory,
    ){}
    async execute(session: ProjectionSession): Promise<void> {

               
         const descriptor =

            await this.descriptorFactory
                .create(
                    session,
                );

        const projectionNodes =

            await this.factory
                .assemble(
                    descriptor,
                );

                session.state.projectionNodes.set(projectionNodes)

    }
}
