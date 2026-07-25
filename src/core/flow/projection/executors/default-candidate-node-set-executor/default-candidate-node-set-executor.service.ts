import { Inject, Injectable } from '@nestjs/common';
import { ProjectionCandidateNodeSet } from '../../contracts/nodes/ProjectionCandidateNodeSet.interface';
import { ProjectionCandidateNodeExecutor } from '../../contracts/executors/projection-candidate-node-executor.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { PROJECTION_CANDIDATE_NODE_DESCRIPTOR_FACTORY, PROJECTION_CANDIDATE_NODE_FACTORY } from '../../Tokens/factories/projection-factories.tokens';
import type { ProjectionCandidateNodeFactory } from '../../contracts/factories/projection-candidate-node-factory.interface';
import type { ProjectionCandidateNodeDescriptorFactory } from '../../contracts/factories/projection-candidate-node-descriptor-factory.interface';

@Injectable()
export class DefaultCandidateNodeSetExecutorService implements 
ProjectionCandidateNodeExecutor {
    
    constructor(

        @Inject(PROJECTION_CANDIDATE_NODE_FACTORY)

        private readonly factory:ProjectionCandidateNodeFactory,

        @Inject(PROJECTION_CANDIDATE_NODE_DESCRIPTOR_FACTORY)
        private readonly descriptorFactory: ProjectionCandidateNodeDescriptorFactory,


    ) {}
    async execute(session: ProjectionSession): Promise<void> {
         
    const graph=session.state.requireProjectionGraph()

    const descriptor=await this.descriptorFactory.create(graph)

    const candidateNodeSet=await this.factory.assemble(descriptor)

    session.state.candidateNodes.set(candidateNodeSet)
        
    }
}
