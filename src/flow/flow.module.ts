import { Module } from '@nestjs/common';
import { RuntimeModule } from './runtime/runtime.module';

@Module({
  imports: [RuntimeModule]
})
export class FlowModule {}
