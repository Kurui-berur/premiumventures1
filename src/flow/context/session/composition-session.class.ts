import { CompositionFrame } from "../frame/composition-frame.interface";
import { CompositionMetadata } from "../metadata/composition-metadata.class";
import { CompositionState } from "../state/composition-state.class";

export class CompositionSession {

    constructor(

        readonly frame:
            CompositionFrame,

        readonly metadata:
            CompositionMetadata,

        readonly state:
            CompositionState,

    ) {}

}