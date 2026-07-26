import { CompositionFrame } from "src/flow/context/frame/composition-frame.interface";
import { CompositionSession } from "src/flow/context/session/composition-session.class";

export interface CompositionSessionFactory {

    create(

        frame: CompositionFrame,

    ): Promise<CompositionSession>;

}