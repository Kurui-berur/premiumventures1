import { FlowView } from "../../../contracts/nodes/flow-view.interface";

export class ProjectionFlowViewState {

    private flowView?:
        FlowView;

    set(

        flowView:
            FlowView,

    ): void {

        this.flowView =
            flowView;

    }

    require():
    FlowView {

        if (!this.flowView) {

            throw new Error(

                'ProjectionState does not contain a FlowView.',

            );

        }

        return this.flowView;

    }

}