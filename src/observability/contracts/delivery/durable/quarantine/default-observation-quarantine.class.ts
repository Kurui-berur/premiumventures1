import { QuarantineStore } from "./observation-quarantine-store.interface";
import { ObservationQuarantine, QuarantinedBatch } from "./observation-quarantine.interface";

export class defaultObservationQuarantine implements ObservationQuarantine {
        
      constructor(
        private readonly quarantineStore: QuarantineStore
      ){}

    async quarantine(batch: QuarantinedBatch): Promise<void> {
        await this.quarantineStore.write(batch);
    }

    
}