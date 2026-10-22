import { Injectable } from '@nestjs/common';
import { GraphRegistry } from '../../contracts/registry/graph-registry.interface';
import { GraphReader } from '../../contracts/graph-reader.interface';

@Injectable()
export class InMemoryGraphRegistryService implements GraphRegistry{
    private readonly graphs=new Map<string,GraphReader>()
    async resolve(graphVersion: string): Promise<GraphReader> {

        const graph=this.graphs.get(graphVersion)

         if (!graph) {

            throw new Error(

                `Graph '${graphVersion}' not found.`,

            );

        }

        return graph;
        
    }

    async register(graphVersion: string, graph: GraphReader): Promise<void> {

        this.graphs.set(graphVersion,graph)
        
    }
}
