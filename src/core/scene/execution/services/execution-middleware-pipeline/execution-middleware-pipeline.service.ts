import { Injectable } from '@nestjs/common';
import { ExecutionMiddleware } from '../../contracts/execution-middleware.interface';
import { Handler } from 'src/core/events/types/event-handler.type';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';

@Injectable()
export class ExecutionMiddlewarePipelineService  {


 async execute<TResult>(
    middlewares:readonly ExecutionMiddleware[],

    frame:ExecutionFrame,

    handler:() => Promise<TResult> ): Promise<TResult>{

       const invoke =async (index:number): Promise<TResult>=>{

            if(index>=middlewares.length){

              return handler();
             }

            return middlewares[index ] .execute(
                 frame,
                  async()=>{
                     return invoke( index+1);
         }

            );
        };
        return invoke(0);

}


}

