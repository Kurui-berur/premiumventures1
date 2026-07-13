import {
Injectable
}
from '@nestjs/common';

import {
DecisionPatchExecutor
}
from '../../../contracts/decision-patch-executor.interface';

import {
PluginDecision
}
from
'src/core/plugins/contracts/plugin-decision.interface';

import {
ExecutionFrame
}
from '../../../contracts/execution-frame.interface';

import {
RuntimeMutation
}
from
'src/core/flow/runtime/types/runtime-mutation.type';
import {  ExecutionSession } from '../../../context/execution-context.class';

@Injectable()
export class DefaultDecisionPatchExecutorService
implements DecisionPatchExecutor {

async execute(context: ExecutionSession): Promise<void> {

    const runtime =
      context.runtime.current();

    const decision =
      context.state.requireDecision();

      const nodeStates =new Map(
      runtime.nodeStates
      );

      const sceneStates =new Map(
      runtime.sceneStates
      );

      decision.nodeStatePatch?.forEach(

              (patch,nodeId)=>{

                    const current =nodeStates.get(nodeId);

                    if(!current){return;

                    }

                    nodeStates.set(nodeId,
                  {

                      ...current,

                      ...patch

                    });

              }

          );

      decision.sceneStatePatch?.forEach(

        (patch,sceneId)=>{

              const current =sceneStates.get(sceneId);

              if(!current){
              return;
              }

              sceneStates.set(sceneId, {

                    ...current,

                    ...patch

              }  );

          });

    const next={

      ...runtime,

      nodeStates,

      sceneStates

      }

    context.runtime.replace(next)

}

}