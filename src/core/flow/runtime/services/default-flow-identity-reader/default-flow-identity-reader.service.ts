import { Injectable } from '@nestjs/common';
import { FlowIdentityReader } from 'src/core/flow/runtime/contracts/flow-identity-reader.interface';

@Injectable()
export class DefaultFlowIdentityReaderService implements FlowIdentityReader{

    private current='';

    set(identity:string){
        this.current=identity
    }
    flowId(): string {
        return this.current
    }
    
}
