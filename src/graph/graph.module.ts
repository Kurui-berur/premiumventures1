import { Module } from '@nestjs/common';
import { GraphService } from './services/graph/graph.service';
import { GraphStoreService } from './services/graph-store/graph-store.service';
import { GraphCacheService } from './services/graph-cache/graph-cache.service';
import { GraphVersioningService } from './services/graph-versioning/graph-versioning.service';

@Module({
  providers: [GraphService, GraphStoreService, GraphCacheService, GraphVersioningService]
})
export class GraphModule {}
