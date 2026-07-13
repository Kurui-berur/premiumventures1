import { FlowIdentity } from "./flow-identity.contract";

export interface FlowIdentityReader {

  current():FlowIdentity;

}