import { Injectable } from '@nestjs/common';
import type { FlowHandler } from '../contracts/flow-handler.interface';
import type { FlowPresenter } from '../contracts/flow-presenter';

type FlowEntry = {
  handler: FlowHandler;
  presenter: FlowPresenter;
};

@Injectable()
export class FlowRegistry {

  private flows = new Map<string, FlowEntry>();

  register(
    name: string,
    handler: FlowHandler,
    presenter: FlowPresenter
  ) {
    this.flows.set(name, { handler, presenter });
  }

  get(name: string): FlowEntry {

    const flow = this.flows.get(name);

    if (!flow) {
      throw new Error(`Flow not found: ${name}`);
    }

    return flow;
  }

  list() {
    return Array.from(this.flows.keys());
  }
}
