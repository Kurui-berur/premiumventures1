import { Injectable } from '@nestjs/common';
import { RuntimeChangeDetector } from '../../contracts/runtime-change-detector.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';

@Injectable()
export class DefaultRuntimeChangeDetectorService implements RuntimeChangeDetector{
    changed(previous: FlowRuntimeState, current: FlowRuntimeState): boolean {
        return previous!==current
    }

    
}
