import { Injectable } from '@nestjs/common';
import { FlowView } from 'src/core/flow/projection/contracts/nodes/flow-view.interface';
import { FlowRuntimeState } from 'src/core/flow/runtime/state/flow-runtime-state';
import { FlowSession } from 'src/flow/contracts/flow-session.contract';

export class DefaultFlowSession implements FlowSession{
 readonly executionId: string;

    readonly flowId: string;

    readonly flowInstanceId: string;

    readonly graphVersion: string;

    readonly runtime:
        FlowRuntimeState;

    readonly view:
        FlowView;

    constructor(

        executionId: string,

        flowId: string,

        flowInstanceId: string,

        graphVersion: string,

        runtime: FlowRuntimeState,

        view: FlowView,

    ) {

        this.executionId =
            executionId;

        this.flowId =
            flowId;

        this.flowInstanceId =
            flowInstanceId;

        this.graphVersion =
            graphVersion;

        this.runtime =
            runtime;

        this.view =
            view;

        Object.freeze(this);

    }
}
