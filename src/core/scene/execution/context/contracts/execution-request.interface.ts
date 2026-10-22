
import { ExecutionMode } from "../../types/execution-mode.types";

export interface ExecutionRequest {

    executionId: string;//An execution represents a particular attempt to process something.

    flowId: string; /*which flow definiton are we executing against */

    flowInstanceId: string;/*"Which particular running instance of that flow?"*/

    graphVersion: string;//Which version of the flow graph should this execution be interpreted against?

    event: SceneEvent; //what event triggered the execution

    mode: ExecutionMode;//mode belongs at the boundary because it affects how execution begins.

    timestamp: number;//The execution engine may need the event's execution time for things like:

}