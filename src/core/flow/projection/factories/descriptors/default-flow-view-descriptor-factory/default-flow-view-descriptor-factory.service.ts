import { Injectable } from '@nestjs/common';
import { FlowViewDescriptor } from '../../../contracts/descriptors/flow-view-descriptor.interface';
import { ProjectionNodeSet } from '../../../contracts/nodes/projection-node-set.interface';
import { FlowViewDescriptorFactory } from '../../../contracts/factories/descriptor-factory/flow-view-descriptor-factory.interface';
import { ProjectionSession } from '../../../context/projection-session.interface';
import { DefaultFlowViewDescriptor } from '../../../descriptors/default-flow-view-descriptor/default-flow-view-descriptor.service';

@Injectable()
export class DefaultFlowViewDescriptorFactoryService implements FlowViewDescriptorFactory{
    async create(session: ProjectionSession): Promise<FlowViewDescriptor> {

       const projectionNodes=session.state.projectionNodes.require()

       const projectionGraph=session.state.requireProjectionGraph()

       return new DefaultFlowViewDescriptor(

            projectionNodes,

            projectionGraph.rootSceneId(),
       )
    }
  
}
