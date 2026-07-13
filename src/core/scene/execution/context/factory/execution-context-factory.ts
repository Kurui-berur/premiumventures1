import { ExecutionFrame } from "../../contracts/execution-frame.interface";
import { ExecutionSession } from "../execution-context.class";


export interface ExecutionContextFactory {

  create(
    frame: ExecutionFrame
  ): ExecutionSession;  }