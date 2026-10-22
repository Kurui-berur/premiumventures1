import { ExecutionSession } from "src/core/scene/execution/context/execution-session.class.js";
import { ProjectionIntent } from "../options/projection-intent.interface.ts";

export interface ProjectionRequest {

    readonly execution: ExecutionSession;

    readonly intent: ProjectionIntent;

}