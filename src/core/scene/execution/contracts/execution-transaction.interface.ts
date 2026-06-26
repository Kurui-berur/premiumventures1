import { ExecutionFrame } from "./execution-frame.interface";

export interface ExecutionTransaction {

execute(frame:ExecutionFrame,
    work:() => Promise<void>): Promise<void>;

}