import { ProjectionSession } from "src/core/flow/projection/context/projection-session.interface";
import { FlowSessionDescriptor } from "../descriptors/flow-session-descriptor.imterface";
import { CompositionSession } from "src/flow/context/session/composition-session.class";

export interface FlowSessionDescriptorFactory {

    create(

        session: CompositionSession,

    ): Promise<FlowSessionDescriptor>}