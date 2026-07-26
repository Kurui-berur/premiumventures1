import { Inject, Injectable } from '@nestjs/common';
import { CompositionFrame } from 'src/flow/context/frame/composition-frame.interface';
import type { CompositionSessionFactory } from 'src/flow/contracts/factory/composition-session-factory.interface';
import { FlowSession } from 'src/flow/contracts/flow-session.contract';
import type { CompositionSessionPipeline } from 'src/flow/contracts/pipelines/composition-session-pipeline.interface';
import { CompositionService } from 'src/flow/contracts/services/composition-service.interface';
import { COMPOSITION_SESSION_FACTORY } from 'src/flow/tokens/factory/factory.tokens';
import { COMPOSITION_PIPELINE } from 'src/flow/tokens/pipelines/pipelines.tokens';

@Injectable()
export class DefaultCompositionService implements CompositionService{
      
       constructor(

        @Inject(COMPOSITION_SESSION_FACTORY)

        private readonly sessionFactory:
            CompositionSessionFactory,

        @Inject(COMPOSITION_PIPELINE)

        private readonly pipeline:
            CompositionSessionPipeline,

    ) {}

    async compose(frame: CompositionFrame): Promise<FlowSession> {

        const session =

            await this
                .sessionFactory
                .create(frame);

        await this
            .pipeline
            .execute(session);

        return session
            .state
            .flowSession
            .require();

    }
        
    }

