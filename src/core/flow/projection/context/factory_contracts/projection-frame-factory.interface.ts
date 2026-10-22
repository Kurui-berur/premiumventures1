import { ProjectionRequest } from "../contracts/initialization/projection-request.interface";
import { ProjectionFrame } from "../frame/projection-frame.interface";


export interface ProjectionFrameFactory {

  create( request: ProjectionRequest): ProjectionFrame;

}