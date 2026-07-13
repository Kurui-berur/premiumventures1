import { Injectable } from '@nestjs/common';
import { MiddlewareChain } from '../../../contracts/middlewares/middleware-chain.interface';
import { Middleware } from '../../../contracts/middlewares/middleware.interface';

@Injectable()
export class DefaultMiddlewareChainService  implements MiddlewareChain {

    execute<Tmiddleware extends Middleware, TResult>(middlewares: readonly Tmiddleware[],

         handler: (middleware: Tmiddleware, next: () => Promise<TResult>) => Promise<TResult>,

        terminal: () => Promise<TResult> 

    ): Promise<TResult> {

            const RunMiddlewareAt=async (index:number):Promise<TResult>=>{

                if(index>=middlewares.length){  
                    return terminal();
                }
                return handler(middlewares[index],()=>RunMiddlewareAt(index+1));
        
    }

        return RunMiddlewareAt(0);
    }

    
}
