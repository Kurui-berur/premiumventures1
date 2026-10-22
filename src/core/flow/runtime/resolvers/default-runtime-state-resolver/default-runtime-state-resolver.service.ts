import { Injectable } from '@nestjs/common';
import { RuntimeStateResolver } from '../../contracts/runtime-state-resolver.interface';
import { RuntimeStore } from '../../contracts/runtime-store.interface';

@Injectable()
export class DefaultRuntimeStateResolverService implements RuntimeStateResolver{
    async resolve(flowInstanceId: string): Promise<RuntimeStore> {
        throw new Error('Method not implemented.');
    }
}
