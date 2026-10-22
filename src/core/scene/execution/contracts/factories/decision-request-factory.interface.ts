import { ExecutionSession } from "../../context/execution-session.class";
import { DecisionRequest } from "../decision/decision-request.interface";

export interface DecisionRequestFactory {
    create(
        context: ExecutionSession
    ): DecisionRequest;
}