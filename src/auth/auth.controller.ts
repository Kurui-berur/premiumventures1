import { Controller, Post, Param, Body } from '@nestjs/common';
import { FlowEngine } from '../core/flow/core/flow.engine';

@Controller('auth')
export class AuthController {

  constructor(private readonly engine: FlowEngine) {}

  @Post()
  async handle(@Body() body: any) {

    return this.engine.handle(
      'auth',
      body.sessionId || 'anonymous',
      {
        type: body.event,
        payload: body.payload || {}
      }
    );
  }
}
