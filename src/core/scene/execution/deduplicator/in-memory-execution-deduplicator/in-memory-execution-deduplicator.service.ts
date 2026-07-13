import { Injectable } from '@nestjs/common';
import { ExecutionDeduplicator } from '../../contracts/execution-deduplicator.interface';

@Injectable()
export class InMemoryExecutionDeduplicatorService implements ExecutionDeduplicator {

     private readonly completed=new Set<string>();


    async exists(executionId: string): Promise<boolean> {
        return this.completed.has(executionId)
       
    }
    async mark(executionId: string): Promise<void> {
         this.completed.add(executionId)
    }
    
}
