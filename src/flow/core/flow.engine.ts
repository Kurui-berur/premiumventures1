
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { FlowRegistry } from './flow.registry';
import { FlowSessionService } from '../session/flow-session.service';
import { FlowEvent } from '../types/flow-event';
import { FlowSession } from '../types/flow-session.type';

@Injectable()
export class FlowEngine {
  private readonly logger = new Logger(
    FlowEngine.name,
  );

  constructor(
    private readonly registry: FlowRegistry,

    private readonly session: FlowSessionService,

    private readonly eventBus: EventEmitter2,
  ) {}

  async handle(
    flowType: string,sessionId: string,event: FlowEvent,
  ) {
    /**
     * ---------------------------------------------------
     * LOAD CURRENT SESSION
     * ---------------------------------------------------
     */

    let current =
      await this.session.get(sessionId);

    /**
     * ---------------------------------------------------
     * INITIALIZE SESSION
     * ---------------------------------------------------
     */

    if (!current) {
      current =
        this.createInitialSession(
          sessionId,
        );
    }

    /**
     * ---------------------------------------------------
     * RESOLVE FLOW
     * ---------------------------------------------------
     */

    const { handler, presenter } =
      this.registry.get(flowType);

    /**
     * ---------------------------------------------------
     * IDEMPOTENCY CHECK
     * ---------------------------------------------------
     */

    if (
      current.processedEvents.includes(
        event.id,
      )
    ) {
      this.logger.warn(
        `Duplicate event ignored: ${event.id}`,
      );

      return {
        state: current.state,

        context: current.context,

        ui: presenter.present(current),
      };
    }

    try {
      /**
       * ---------------------------------------------------
       * EXECUTE FLOW HANDLER
       * ---------------------------------------------------
       */

      const result =
        await handler.handle({
          state: current.state,

          event,

          context: current.context,

          sessionId,
        });

      /**
       * ---------------------------------------------------
       * BUILD NEXT SESSION SNAPSHOT
       * ---------------------------------------------------
       */

      const nextState: FlowSession = {
        sessionId,

        state: result.state,

        context:
          result.context ||
          current.context,

        version: current.version + 1,

        processedEvents: [
          ...current.processedEvents,
          event.id,
        ],

        history: [
          ...current.history,

          {
            from: current.state,

            to: result.state,

            event,

            at: Date.now(),
          },
        ],

        updatedAt: Date.now(),
      };

      /**
       * ---------------------------------------------------
       * OPTIMISTIC CONCURRENCY CONTROL
       * ---------------------------------------------------
       */

      const updated =
        await this.session.updateIfVersionMatches(
          sessionId,
          current.version,
          nextState,
        );

      if (!updated) {
        throw new Error(
          'FLOW_CONFLICT_DETECTED',
        );
      }

      /**
       * ---------------------------------------------------
       * EMIT TRANSITION EVENT
       * ---------------------------------------------------
       */

      await this.eventBus.emitAsync(
        'flow.transitioned',
        {
          flowType,

          sessionId,

          from: current.state,

          to: nextState.state,

          eventType: event.type,

          version: nextState.version,

          at: Date.now(),
        },
      );

      /**
       * ---------------------------------------------------
       * RETURN UI RESPONSE
       * ---------------------------------------------------
       */

      return {
        state: nextState.state,

        context: nextState.context,

        ui: presenter.present(nextState),
      };
    } catch (err: any) {
      /**
       * ---------------------------------------------------
       * LOG FAILURE
       * ---------------------------------------------------
       */

      this.logger.error(
        'FLOW ENGINE ERROR',
        err?.stack || err,
      );

      /**
       * ---------------------------------------------------
       * EMIT FAILURE EVENT
       * ---------------------------------------------------
       */

      await this.eventBus.emitAsync(
        'flow.failed',
        {
          flowType,

          sessionId,

          state: current.state,

          eventType: event.type,

          error:
            err?.message || 'UNKNOWN',
        },
      );

      /**
       * ---------------------------------------------------
       * SAFE FAILURE RESPONSE
       * ---------------------------------------------------
       */

      return {
        state: current.state,

        context: current.context,

        ui: {
          step: 'ERROR',

          error:
            err?.message ||
            'UNKNOWN_ERROR',
        },
      };
    }
  }

  /**
   * ---------------------------------------------------
   * INITIAL SESSION FACTORY
   * ---------------------------------------------------
   */

  private createInitialSession(
    sessionId: string,
  ): FlowSession {
    return {
      sessionId,

      state: 'INIT',

      context: {},

      version: 0,

      processedEvents: [],

      history: [],

      updatedAt: Date.now(),
    };
  }
}