import { Inject, Injectable } from '@nestjs/common';
import { CompositionSession } from 'src/flow/context/session/composition-session.class';
import { FlowSessionExecutor } from 'src/flow/contracts/executors/flow-session-executor.interface';
import type { FlowSessionDescriptorFactory } from 'src/flow/contracts/factory/flow-session-descriptor-factory.interface';
import type { FlowSessionFactory } from 'src/flow/contracts/factory/flow-session-factory.interface';
import { FLOW_SESSION_DESCRIPTOR_FACTORY, FLOW_SESSION_FACTORY } from 'src/flow/tokens/factory/factory.tokens';

@Injectable()
export class DefaultFlowSessionExecutorService implements FlowSessionExecutor{
    constructor(
        @Inject(FLOW_SESSION_DESCRIPTOR_FACTORY)
        private readonly descriptorFactory:FlowSessionDescriptorFactory,

        @Inject(FLOW_SESSION_FACTORY)
        private readonly flowSessionFactory:FlowSessionFactory,
    ){}
    async execute(session: CompositionSession): Promise<void> {

        const descriptor =

            await this
                .descriptorFactory
                .create(session);

        const flowSession =

            await this
                .flowSessionFactory
                .create(descriptor);

        session.state
            .flowSession
            .set(flowSession);

    }
}
