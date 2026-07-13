import { Inject, Injectable } from '@nestjs/common';
import { FlowSession } from 'src/flow/models/flow-session.interface';
import type { GraphLoaderPort } from 'src/flow/ports/graph-loader.port';
import type { RuntimeReaderPort } from 'src/flow/ports/runtime-reader.port';
import { GRAPH_LOADER, RUNTIME_PORT_READER } from 'src/flow/tokens/flow-tokens';

@Injectable()
export class FlowLoaderService {
    constructor(
   @Inject(GRAPH_LOADER)
   private readonly graph: GraphLoaderPort,
   
   @Inject(RUNTIME_PORT_READER)
   private readonly runtime: RuntimeReaderPort

 ) {}

 async load(flowId: string): Promise<FlowSession> {

   const definition = await this.graph.load(flowId);

   const runtime =await this.runtime.load(flowId);

   return {

     flowId,

     graphVersion:
       definition.version,

     graph:
       definition.graph,

     runtime

   };

 }
}
