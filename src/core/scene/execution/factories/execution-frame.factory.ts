import { Inject, Injectable } from "@nestjs/common";
import { ExecutionFrameFactory } from "../contracts/execution-frame-factory.interface";
import { SceneEvent } from "src/core/events/types/scene-event.type";
import { ExecutionFrame } from "../contracts/execution-frame.interface";
import type { RuntimeReader } from "src/core/flow/runtime/contracts/runtime-reader.interface";
import type { GuardReader } from "src/core/guards/contracts/guard-reader.interface";
import { ExecutionMode } from "../types/execution-mode.types";
import { FLOW_IDENTITY, RUNTIME_VIEW_PROVIDER } from "src/core/flow/runtime/tokens/runtime-tokens";
import { EXECUTION_ID_GENERATOR } from "../tokens/execution.tokens";
import type { ExecutionIdGenerator } from "../contracts/execution-id-generator.interface";
import type { FlowIdentityReader } from "src/core/flow/runtime/contracts/flow-identity-reader.interface";
import type { RuntimeViewProvider } from "src/core/flow/runtime/contracts/runtime-view-provider.interface";

@Injectable()
export class DefaultExecutionFrameFactory implements ExecutionFrameFactory {
    constructor(
        @Inject(RUNTIME_VIEW_PROVIDER)
        private readonly runtime:RuntimeViewProvider,

        @Inject(EXECUTION_ID_GENERATOR)
        private readonly ids:ExecutionIdGenerator,

        @Inject(FLOW_IDENTITY)
        private readonly identity:FlowIdentityReader

    ){}


    create(event: SceneEvent): ExecutionFrame {
        const mode: ExecutionMode = 'ORIGINAL';

        const snapshot =this.runtime.snapshot();

        const identity =this.identity.current();

        return {

        executionId:this.ids.generate(event),

        flowId:snapshot.flowId,

        flowInstanceId:identity.flowInstanceId,

        pluginId: identity.pluginId,

        graphVersion: identity.graphVersion,

        event,

        state:snapshot.state,

        mode,

        timestamp: snapshot.timestamp

        };
    
}
}