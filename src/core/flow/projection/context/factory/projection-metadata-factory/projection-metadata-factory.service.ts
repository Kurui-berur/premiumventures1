import { Injectable } from '@nestjs/common';
import { ProjectionMetadataFactory } from '../../factory_contracts/projection-metadata-factory.interface';
import { ProjectionMetadata } from '../../metadata/projection-metadata.classs';

@Injectable()
export class ProjectionMetadataFactoryService implements ProjectionMetadataFactory {
   async create(): Promise<ProjectionMetadata> {
       return new ProjectionMetadata()
    }
}
