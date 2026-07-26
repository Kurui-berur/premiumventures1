import { Injectable } from '@nestjs/common';
import { ProjectionReader } from '../../contracts/projection-reader/projection-reader.interface';
import { FlowView } from '../../contracts/nodes/flow-view.interface';
import { ProjectionState } from '../../context/state/projection-state.class';

@Injectable()
export class DefaultProjectionReaderService implements ProjectionReader{
    constructor(
        readonly state:ProjectionState
    ){}
    requireFlowView(): FlowView {
        return this.state.flowView.require()
    }
    
}
