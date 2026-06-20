import { Module } from '@nestjs/common';
import { GraphReaderService } from './services/graph-reader/graph-reader.service';


@Module({
  providers: [GraphReaderService]
})
export class GraphCoreModule {}
