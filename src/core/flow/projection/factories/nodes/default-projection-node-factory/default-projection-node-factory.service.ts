import { Injectable } from '@nestjs/common';
import { ProjectionNodeFactory } from '../../../contracts/factories/projection-node/projection-node-factory.interface';
import { ProjectionNodeDescriptor } from '../../../contracts/nodes/projection-node-descriptor.interface';
import { ProjectionNodeSet } from '../../../contracts/nodes/projection-node-set.interface';
import { DefaultProjectionNodeSet } from '../../../nodes/default-project-node-set/default-project-node-set.service';

@Injectable()
export class DefaultProjectionNodeFactoryService implements ProjectionNodeFactory{
   async assemble(descriptor: ProjectionNodeDescriptor): Promise<ProjectionNodeSet> {
        return new DefaultProjectionNodeSet(descriptor)
    }
}
