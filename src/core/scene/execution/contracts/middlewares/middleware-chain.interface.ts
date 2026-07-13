import { Middleware } from "./middleware.interface";

export interface MiddlewareChain {

  execute<Tmiddleware extends Middleware, TResult>(

    middlewares:
      readonly Tmiddleware[],

    handler:
      (middleware: Tmiddleware, next: () => Promise<TResult>)
      => Promise<TResult>,

    terminal:
      () => Promise<TResult>

  ): Promise<TResult>;

}