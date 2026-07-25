import { Injectable } from '@nestjs/common';
import { ProjectionGraphStrategyRegistry } from '../../contracts/registries/projection-graph-strategy-registry.interface';
import { ProjectionGraphStrategy } from '../../contracts/strategies/projection-graph-strategy.interface';
import { ProjectionScope } from '../../types/projection-scope.types';

@Injectable()
export class DefaultProjectionGraphStrategyRegistryService implements ProjectionGraphStrategyRegistry {
        private readonly strategiesRegistry =new Map<
            ProjectionScope,
            ProjectionGraphStrategy
        >()
        constructor(
            readonly strategies: readonly ProjectionGraphStrategy[],
        ){
            for (const strategy of strategies){
                this.strategiesRegistry.set(strategy.scope,strategy)
            }
        }


    async resolve(scope: ProjectionScope): Promise<ProjectionGraphStrategy> {

        const strategy=this.strategiesRegistry.get(scope)

        if(!strategy){

            throw new Error(
                `No ProjectionGraphStrategy registered for '${scope}'.`,
            );
        }
        return strategy
        
    }
}
