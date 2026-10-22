import { Inject, Injectable } from '@nestjs/common';
import { ProjectionFrame } from '../../frame/projection-frame.interface';
import type { ProjectionRuntimeReader } from 'src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface';
import type { GraphReader } from 'src/graph/graph-core/contracts/graph-reader.interface';
import { ProjectionFrameFactory } from '../../factory_contracts/projection-frame-factory.interface';
import { PROJECTION_RUNTIME_READER } from 'src/core/flow/runtime/tokens/readers/readers-tokens';
import { PROJECTION_OPTIONS } from '../../../Tokens/projection.tokens';
import { GRAPH_READER } from 'src/graph/tokens/graph-tokens';
import type { ProjectionIntent } from '../../contracts/options/projection-intent.interface.ts';
import { ProjectionRequest } from '../../contracts/initialization/projection-request.interface';

@Injectable()
export class DefaultProjectionFrameFactoryService implements ProjectionFrameFactory{


  create(request:ProjectionRequest): ProjectionFrame {

    return {

      graph: request.execution.frame.graph,

      runtime: request.execution.frame.runtime,

      intent: request.intent

    };

  }
}
