import { Injectable } from '@nestjs/common';
import { FlowSessionDescriptor } from 'src/flow/contracts/descriptors/flow-session-descriptor.imterface';
import { FlowSessionFactory } from 'src/flow/contracts/factory/flow-session-factory.interface';
import { FlowSession } from 'src/flow/contracts/flow-session.contract';
import { DefaultFlowSession } from 'src/flow/flow-session/default-flow-session/default-flow-session.service';

@Injectable()
export class DefaultFlowSessionFactoryService implements FlowSessionFactory{
    async create(descriptor: FlowSessionDescriptor): Promise<FlowSession> {
        return new DefaultFlowSession(
            descriptor.runtime,
            descriptor.view
        )
    }
}
