import { Injectable } from '@nestjs/common';
import { ProjectionGraph } from '../../contracts/graph/projection-graph.interface';
import { ProjectionGraphFactory } from '../../contracts/factories/projection-graph-factory.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { ProjectionSeed } from '../../context/state/projection-seed.interface';
import { ProjectionGraphDescriptor } from '../../contracts/descriptors/projectiongraphdescriptor.interface';
import { DefaultProjectionGraphService } from '../../graph/default-projection-graph/default-projection-graph.service';

@Injectable()
export class DefaultProjectionGraphFactoryService implements ProjectionGraphFactory{
    constructor(){}
    async create(session: ProjectionSession, descriptor: ProjectionGraphDescriptor): Promise<ProjectionGraph> {
        
        return new DefaultProjectionGraphService(
            session.frame.graph,
            descriptor.rootSceneId,
            descriptor.sceneIds )
    }
    
    }

