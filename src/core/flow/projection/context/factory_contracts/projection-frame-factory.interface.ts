import { ProjectionFrame } from "../frame/projection-frame.interface";


export interface ProjectionFrameFactory {

  create(): ProjectionFrame;

}