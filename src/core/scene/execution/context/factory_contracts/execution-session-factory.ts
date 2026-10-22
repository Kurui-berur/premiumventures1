import { ExecutionFrame } from "../../contracts/execution-frame.interface";
import { ExecutionSession } from "../execution-session.class";


export interface ExecutionSessionFactory {

  create(
    frame: ExecutionFrame
  ): ExecutionSession;  }