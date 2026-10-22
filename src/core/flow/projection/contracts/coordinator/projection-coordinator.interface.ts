import { ProjectionRequest } from "../../context/contracts/initialization/projection-request.interface";
import { FlowView } from "../nodes/flow-view.interface";

export interface ProjectionCoordinator {

    project(
        request: ProjectionRequest,
    ): Promise<FlowView>;

}