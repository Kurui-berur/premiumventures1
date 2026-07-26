import { Injectable } from '@nestjs/common';
import { CompositionFrame } from 'src/flow/context/frame/composition-frame.interface';
import { CompositionMetadata } from 'src/flow/context/metadata/composition-metadata.class';
import { CompositionSession } from 'src/flow/context/session/composition-session.class';
import { CompositionState } from 'src/flow/context/state/composition-state.class';
import { CompositionSessionFactory } from 'src/flow/contracts/factory/composition-session-factory.interface';

@Injectable()
export class DefaultCompositionSessionFactoryService implements  CompositionSessionFactory {
    async create(frame: CompositionFrame): Promise<CompositionSession> {
        const metadata =

            new CompositionMetadata();

        const state =

            new CompositionState();

        return new CompositionSession(

            frame,

            metadata,

            state,

        );

    }
    }

