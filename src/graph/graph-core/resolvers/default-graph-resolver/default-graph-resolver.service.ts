import { Inject, Injectable } from '@nestjs/common';
import { GraphResolver } from '../../contracts/resolvers/graph-resolver.interface';
import { GraphReader } from '../../contracts/graph-reader.interface';
import type { GraphRegistry } from '../../contracts/registry/graph-registry.interface';
import { GRAPH_REGISTRY } from 'src/graph/tokens/graph-registry.tokens';

@Injectable()
export class DefaultGraphResolverService implements GraphResolver {
    constructor(
        @Inject(GRAPH_REGISTRY)
        private readonly registry:GraphRegistry,

    ){}
    async resolve(graphVersion: string): Promise<GraphReader> {
        
        return this.registry.resolve(graphVersion)
    }
}
