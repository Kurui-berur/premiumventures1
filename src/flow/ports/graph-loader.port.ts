export interface GraphLoaderPort {

 load(
   flowId: string
 ): Promise<{
   version: string;

   graph: RenderGraph;
 }>;

}