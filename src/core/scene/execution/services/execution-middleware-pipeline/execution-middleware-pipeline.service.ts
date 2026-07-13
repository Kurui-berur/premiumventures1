import { Injectable } from '@nestjs/common';

import {
ExecutionMiddleware
}
from '../../contracts/execution-middleware.interface';

import {
ExecutionContext
}
from '../../contracts/execution-context.interface';

@Injectable()
export class ExecutionMiddlewarePipelineService {

  async execute<TResult>(

    middlewares:
      readonly ExecutionMiddleware[],

    context:
      ExecutionContext,

    handler:
      () => Promise<TResult>

  ): Promise<TResult> {

    const invoke =

      async (
        index: number
      ): Promise<TResult> => {

        if (
          index >=
          middlewares.length
        ) {

          return handler();

        }

        return middlewares[
          index
        ].execute(

          context,

          async () => {

            return invoke(

              index + 1

            );

          }

        );

      };

    return invoke(0);

  }

}