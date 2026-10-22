import { ObservationBuffer } from "../contracts/buffer/observation-buffer.interface";
import { ObservationIngress } from "../contracts/delivery/ingress/observation-ingress.interface";
import { ObservationHandoff } from "../contracts/handoff/observation-handoff.interface";
import { Observation } from "../contracts/observation/observation.interface";

export class InMemoryObservationHandoff implements ObservationHandoff {

    constructor(
        
        private readonly ingress:ObservationIngress
    ) {

        
    }

    handoff(observation: Observation): void {

        this.ingress.accept(observation);

        
        
    }
}