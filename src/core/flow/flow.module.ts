import { Module } from '@nestjs/common';
import { RuntimeModule } from './runtime/runtime.module';
import { ProjectionModule } from './projection/projection.module';

@Module({
  imports: [RuntimeModule, ProjectionModule]
})
export class FlowModule {}
