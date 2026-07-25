import { ProjectionScope } from '../../types/projection-scope.types';
import { ProjectionGraphStrategy } from '../strategies/projection-graph-strategy.interface';

export interface ProjectionGraphStrategyRegistry {

    resolve(
        scope: ProjectionScope
    ): Promise<ProjectionGraphStrategy>;

}