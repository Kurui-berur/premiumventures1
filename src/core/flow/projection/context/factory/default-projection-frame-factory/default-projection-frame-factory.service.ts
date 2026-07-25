import { Inject, Injectable } from '@nestjs/common';
import { ProjectionFrame } from '../../frame/projection-frame.interface';
import type { ProjectionRuntimeReader } from 'src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface';
import type { GraphReader } from 'src/graph/graph-core/contracts/graph-reader.interface';
import { ProjectionOptions } from '../../contracts/options/projection-intent.interface.ts';
import { ProjectionFrameFactory } from '../../factory_contracts/projection-frame-factory.interface';
import { PROJECTION_RUNTIME_READER } from 'src/core/flow/runtime/tokens/readers/readers-tokens';
import { PROJECTION_OPTIONS } from '../../../Tokens/projection.tokens';
import { GRAPH_READER } from 'src/graph/tokens/graph-tokens';

@Injectable()
export class DefaultProjectionFrameFactoryService implements ProjectionFrameFactory{
  constructor(

    @Inject(GRAPH_READER)
    private readonly graph: GraphReader,

    @Inject(PROJECTION_RUNTIME_READER)
    private readonly runtime: ProjectionRuntimeReader,

    @Inject(PROJECTION_OPTIONS)
    private readonly options: ProjectionOptions

  ) {}

  create(): ProjectionFrame {

    return {

      graph: this.graph,

      runtime: this.runtime,

      intent: this.options

    };

  }
}
