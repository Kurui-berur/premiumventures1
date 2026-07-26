import { CompositionSession } from "src/flow/context/session/composition-session.class";

export interface CompositionSessionPipeline {

    execute(

        session:
            CompositionSession,

    ): Promise<void>;

}