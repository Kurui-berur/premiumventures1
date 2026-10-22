import { ObservationFactory } from "../contracts/factories/observation-factory.interface";
import { ObservationInput } from "../contracts/observation/observation-input.interface";
import { Observation } from "../contracts/observation/observation.interface";

export class defaultObservationFactory implements ObservationFactory {

    create<TPayload>(input: ObservationInput<TPayload>): Observation<TPayload> {
        
        const observation: Observation<TPayload> = {

            id: crypto.randomUUID(),
            type: input.type,
            timestamp: Date.now(),

            context: input.context,

           sequence: input.sequence,
            causedBy: input.causedBy,

            payload: input.payload

    }
return observation;

  }}