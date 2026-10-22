import { Inject } from "@nestjs/common";
import type { ObservationHandoff } from "../contracts/handoff/observation-handoff.interface";
import { Observation } from "../contracts/observation/observation.interface";
import { ObservationSink } from "../contracts/sink/observation-sink.interface";
import { OBSERVATION_HANDOFF } from "../tokens/handoff/observation-handoff.token";

export class defaultObservationSink implements ObservationSink {
    constructor(
        @Inject(OBSERVATION_HANDOFF)
        private readonly handoff: ObservationHandoff
    ) {}
    publish(observation: Observation): void {
        this.handoff.handoff(observation);
    }
 
  }