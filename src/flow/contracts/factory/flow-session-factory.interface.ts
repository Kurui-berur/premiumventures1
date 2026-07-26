import { FlowSessionDescriptor } from "../descriptors/flow-session-descriptor.imterface";
import { FlowSession } from "../flow-session.contract";

export interface FlowSessionFactory {

    create(

        descriptor:
            FlowSessionDescriptor,

    ): Promise<FlowSession>;

}