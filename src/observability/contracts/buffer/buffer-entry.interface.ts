import { ObservationState } from "src/observability/types/observation-state.type";
import { PendingNode } from "../nodes/pending-node.interface";
import { Observation } from "../observation/observation.interface";

export interface BufferEntry {
    observation:Observation;
    observationState:ObservationState;
    pendingNode?:PendingNode;

}