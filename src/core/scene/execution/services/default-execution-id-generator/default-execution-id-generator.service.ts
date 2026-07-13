import { Injectable } from '@nestjs/common';
import { ExecutionIdGenerator } from '../../contracts/execution-id-generator.interface';
import { SceneEvent } from 'src/core/events/types/scene-event.type';

@Injectable()
export class DefaultExecutionIdGeneratorService implements ExecutionIdGenerator {

    generate(event: SceneEvent): string {
        return event.id
    }
}
