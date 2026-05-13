import { Controller, Post, Param, Body } from "@nestjs/common";
import { FlowEngine } from "./core/flow.engine";

@Controller('flow')
export class FlowController {

  constructor(private readonly engine: FlowEngine) {}

  @Post(':type')
  async handle(
    @Param('type') type: string,
    @Body() body: any
  ) {

    const sessionId = body.sessionId || 'anonymous';

    const event = {
      type: body.event,
      payload: body.payload || {}
    };

    console.log('📥 FLOW REQUEST:', {
      type,
      sessionId,
      event
    });

    return this.engine.handle(type, sessionId, event);
  }
}
 