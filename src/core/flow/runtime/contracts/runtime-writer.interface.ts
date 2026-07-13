

import { FlowRuntimeState }
from '../state/flow-runtime-state';
import { RuntimeMutation } from '../types/runtime-mutation.type';

export interface RuntimeWriter {

  apply(

    mutation:
      RuntimeMutation

  ): Promise<
   
    void
  >;

}