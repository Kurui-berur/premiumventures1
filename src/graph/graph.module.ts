import { Module } from '@nestjs/common';
import { GraphService } from './services/graph/graph.service';
import { GraphStoreService } from './services/graph-store/graph-store.service';
import { GraphCacheService } from './services/graph-cache/graph-cache.service';
import { GraphVersioningService } from './services/graph-versioning/graph-versioning.service';
import { GraphCoreModule } from './graph-core/graph-core.module';

@Module({
  providers: [GraphService, GraphStoreService, GraphCacheService, GraphVersioningService],
  imports: [GraphCoreModule]
})
export class GraphModule {}
