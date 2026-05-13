import { Injectable } from '@nestjs/common';
import { FlowHandler } from 'src/flow/contracts/flow-handler.interface';
import { FlowEvent } from 'src/flow/types/flow-event';

@Injectable()
export class PaymentHandlerService implements FlowHandler{
    handle(params: { state: string; event: FlowEvent; sessionId?: string; context?: any; }): 
    Promise<{ state: string; context: any; blocks?: any[]; }> {
        throw new Error('Method not implemented.');
    }

}
