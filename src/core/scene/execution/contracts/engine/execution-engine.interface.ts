import { ExecutionSession } from "../../context/execution-session.class";

export interface ExecutionEngine {

    execute(
        session: ExecutionSession,
    ): Promise<void>;

}