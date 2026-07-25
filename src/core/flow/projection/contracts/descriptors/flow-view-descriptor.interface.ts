import { ProjectionNodeSet } from "../nodes/projection-node-set.interface";

export interface FlowViewDescriptor {

    readonly projectionNodes:
        ProjectionNodeSet;

    readonly rootSceneId: string;



}