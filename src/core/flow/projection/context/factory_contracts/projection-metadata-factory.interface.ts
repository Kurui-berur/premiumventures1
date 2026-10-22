import { ProjectionMetadata } from "../metadata/projection-metadata.classs";

export interface ProjectionMetadataFactory {

    create(): Promise<ProjectionMetadata>;

}