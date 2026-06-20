import { Injectable } from '@nestjs/common';
import { FlowPresenter } from '../../core/flow/contracts/flow-presenter';

@Injectable()
export class AuthPresenter implements FlowPresenter {

  present(state: any) {

    switch (state.state) {

      case 'INIT':
        return { step: 'identifier' };

      case 'PASSWORD':
        return {
          step: 'password',
          data: {
            identifier: state.context.identifier
          }
        };

      case 'OTP':
        return {
          step: 'otp',
          data: {
            identifier: state.context.identifier
          }
        };

      case 'SUCCESS':
        return { step: 'success' };

      default:
        return { step: 'identifier' };
    }
  }
}
