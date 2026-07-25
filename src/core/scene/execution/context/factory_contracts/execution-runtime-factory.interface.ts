import { ExecutionFrame } from "../../contracts/execution-frame.interface";
import { ExecutionRuntime } from "../runtime/execution-runtime.class";

export interface ExecutionRuntimeFactory {

  create(
    frame: ExecutionFrame
  ): ExecutionRuntime;

}