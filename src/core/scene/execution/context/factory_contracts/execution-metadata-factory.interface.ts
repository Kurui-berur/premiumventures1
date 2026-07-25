import { ExecutionMetadata } from "../metadata/execution-metadata.class";

export interface ExecutionMetadataFactory {

  create(): ExecutionMetadata;

}