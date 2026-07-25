import { Inject, Injectable } from '@nestjs/common';
import { FlowViewExecutor } from '../../contracts/executors/flow-view-executor.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import type { FlowViewDescriptorFactory } from '../../contracts/factories/descriptor-factory/flow-view-descriptor-factory.interface';
import type { FlowViewFactory } from '../../contracts/factories/flow-view/flow-view-factory.interface';
import { FLOW_VIEW_DESCRIPTOR_FACTORY, FLOW_VIEW_FACTORY } from '../../Tokens/factories/projection-factories.tokens';

@Injectable()
export class DefaultFlowViewExecutorService implements FlowViewExecutor{
    constructor(
        @Inject( FLOW_VIEW_DESCRIPTOR_FACTORY)
        private readonly descriptorFactory: FlowViewDescriptorFactory,

        @Inject(FLOW_VIEW_FACTORY)
        private readonly flowViewFactory: FlowViewFactory,
    ){}
    async execute(session: ProjectionSession): Promise<void> {
        
        const descriptor =

            await this
                .descriptorFactory
                .create(session);

        const flowView =

            await this
                .flowViewFactory
                .create(descriptor);

        session.state
            .flowView
            .set(flowView);

    }
}
