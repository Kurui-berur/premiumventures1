import { Inject, Injectable } from '@nestjs/common';
import { ExecutionTransaction } from '../../contracts/execution-transaction.interface';
import { EXECUTION_TRACKER } from '../../tokens/execution.tokens';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import { RUNTIME_SNAPSHOT } from 'src/core/flow/runtime/tokens/runtime-tokens';
import type { RuntimeSnapshot } from 'src/core/flow/runtime/contracts/runtime-snapshot.interface';

@Injectable()
export class DefaultExecutionTransactionService implements ExecutionTransaction{


    constructor(
        @Inject(EXECUTION_TRACKER)
        private readonly tracker:ExecutionTracker,

        @Inject(RUNTIME_SNAPSHOT)
        private readonly snapshot:RuntimeSnapshot
    ){

    }

   async execute(frame:ExecutionFrame ,work: () => Promise<void>): Promise<void> {
        

        await this.tracker.transactionStarted(frame)

        const previous=await this.snapshot.capture()

        try{

            await work()

            await this.tracker.transactionCompleted(frame)

        }catch(error){

            await this.snapshot.restore(previous)

             await this.tracker.transactionFailed(frame,error)

             throw error
        }
        
    }

    }

