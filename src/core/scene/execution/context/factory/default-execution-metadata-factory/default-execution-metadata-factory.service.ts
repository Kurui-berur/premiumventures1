import { Injectable } from '@nestjs/common';
import { ExecutionMetadataFactory } from '../../factory_contracts/execution-metadata-factory.interface';
import { ExecutionMetadata } from '../../metadata/execution-metadata.class';

@Injectable()
export class DefaultExecutionMetadataFactoryService implements ExecutionMetadataFactory {
    create(): ExecutionMetadata {
            return new ExecutionMetadata();
    }
}
