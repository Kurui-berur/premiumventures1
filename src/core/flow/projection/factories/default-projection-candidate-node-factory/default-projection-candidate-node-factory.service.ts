import { Injectable } from '@nestjs/common';
import { ProjectionCandidateNodeFactory } from '../../contracts/factories/projection-candidate-node-factory.interface';
import { ProjectionCandidateNodeDescriptor } from '../../contracts/descriptors/projection-candidate-node-descriptor.interface';
import { ProjectionCandidateNodeSet } from '../../contracts/nodes/ProjectionCandidateNodeSet.interface';
import { DefaultProjectionCandidateNodeSet } from '../../nodes/default-projection-candidate-node-set/default-projection-candidate-node-set.service';

@Injectable()
export class DefaultProjectionCandidateNodeFactoryService implements ProjectionCandidateNodeFactory{
    async assemble(descriptor: ProjectionCandidateNodeDescriptor): Promise<ProjectionCandidateNodeSet> {
            return new DefaultProjectionCandidateNodeSet(descriptor)   
    }
}
