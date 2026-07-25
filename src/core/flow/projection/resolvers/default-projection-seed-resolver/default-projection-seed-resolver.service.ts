import { Inject, Injectable } from '@nestjs/common';
import { ProjectionSeedResolver } from '../../contracts/resolvers/projection-seed-resolver.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { ProjectionSeed } from '../../context/state/projection-seed.interface';
import type { ProjectionSeedStrategyRegistry } from '../../contracts/registries/projection-seed-strategy-registry.interface';
import { PROJECTION_SEED_STRATEGY_REGISTRY } from '../../Tokens/registies/projection-registriess.tokens';

@Injectable()
export class DefaultProjectionSeedResolverService implements ProjectionSeedResolver{

    constructor(
            @Inject(PROJECTION_SEED_STRATEGY_REGISTRY)
            private readonly registry:ProjectionSeedStrategyRegistry


    ){}
    async resolve(session: ProjectionSession): Promise<ProjectionSeed> {

        const strategy=await this.registry.resolve(session.frame.intent.mode)

        return (await strategy).create(session)

        
        
    }
    
}
