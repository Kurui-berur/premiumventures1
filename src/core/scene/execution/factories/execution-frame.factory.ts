import { Injectable } from "@nestjs/common";
import { ExecutionFrameFactory } from "../contracts/execution-frame-factory.interface";
import { SceneEvent } from "src/core/events/types/scene-event.type";
import { ExecutionFrame } from "../contracts/execution-frame.interface";
import type { RuntimeReader } from "src/core/flow/runtime/contracts/runtime-reader.interface";
import type { GuardReader } from "src/core/guards/contracts/guard-reader.interface";

@Injectable()
export class DefaultExecutionFrameFactory
implements ExecutionFrameFactory {
    constructor(
        private readonly runtime:RuntimeReader,
        private readonly guards:GuardReader

    ){}


    create(event: SceneEvent): ExecutionFrame {
        
        return{

            executionId:crypto.randomUUID(),

            flowId:this.runtime.flowId(),

            event,
            state:Object.freeze(this.runtime.state()),

            guards:Object.freeze(this.guards.snapshot()),

            timestamp:Date.now()



        }
       
    }
    
}