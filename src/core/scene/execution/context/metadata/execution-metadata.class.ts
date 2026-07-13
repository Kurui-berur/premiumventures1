import { ScopeMetadata } from "./scope/scope-metadata.class";
import { TimingMetadata } from "./timings/timing-metadata.class";


export class ExecutionMetadata {



  readonly scope =
    new ScopeMetadata();

  readonly timing =
    new TimingMetadata();

}

