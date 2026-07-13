import { Injectable } from '@nestjs/common';
import { GuardRegistry } from '../../contracts/guard-registry.interface';
import { Guard } from '../../contracts/guard.interface';

@Injectable()
export class DefaultGuardRegistryService implements GuardRegistry {

    private readonly guardMap = new Map<string, Guard>();

    constructor(
        private readonly guards: readonly Guard[]
    ) {
        for (const guard of guards) {
            this.guardMap.set(guard.id, guard);
        }
    }


    async resolve(guardId: string): Promise<Guard> {
        const guard =this.guardMap.get(guardId);

        if(!guard){
            throw new Error(`Guard with id ${guardId} not found`);
        }
        return guard;
    }
    
}
