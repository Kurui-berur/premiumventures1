import { FlowSession } from "../models/flow-session.interface";

export interface FlowLoaderPort {

 load(
   flowId: string
 ): Promise<FlowSession>;

}