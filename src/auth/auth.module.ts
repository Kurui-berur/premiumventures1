import { OnModuleInit, Module } from '@nestjs/common';
import { FlowRegistry } from '../flow/core/flow.registry';
import { AuthFlow } from './flows/auth.flow';
import { AuthPresenter } from './flows/auth.presenter';
import { FlowModule } from '../flow/flow.module';
import { AuthFlowService } from './services/auth-flow.service';
import { AuthFlowHandlerService } from './services/auth-flow-handler.service';

@Module({
  imports: [FlowModule],
  providers: [AuthFlow, AuthPresenter , AuthFlowService, AuthFlowHandlerService]
})
export class AuthModule implements OnModuleInit {

  constructor(
    private registry: FlowRegistry,
    private authFlow: AuthFlow,
    private authPresenter: AuthPresenter
  ) {}

  onModuleInit() {
    this.registry.register(
      'auth',
      this.authFlow,
      this.authPresenter
    );

    console.log('🚀 Auth flow registered');
  }
}
