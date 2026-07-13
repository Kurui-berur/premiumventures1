export interface ProjectionCoordinator {

  project(
    flowInstanceId: string
  ): Promise<void>;

}