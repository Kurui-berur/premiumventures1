export interface ProjectionPipeline {

  execute(

    flowInstanceId: string

  ): Promise<void>;

}