import { CompositionSession } from "src/flow/context/session/composition-session.class";

export interface FlowSessionExecutor {

    execute(

        session:
            CompositionSession,

    ): Promise<void>;

}