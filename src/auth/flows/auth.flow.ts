import { Injectable } from '@nestjs/common';
import { FlowHandler } from '../../core/flow/contracts/flow-handler.interface';
import { AuthEventType } from '../constants/auth-event.enum';
import { AuthState } from '../constants/auth-states';

@Injectable()
export class AuthFlow implements FlowHandler<AuthState> {

  async handle({ state, event, context }: any) {

    console.log('🔐 AUTH FLOW:', { state, event, context });

    switch (state) {

      case AuthState.INIT:
        if (event.type === AuthEventType.INIT) {
          return {
            state: AuthState.EMAIL,
            context
          };
        }
        return { state, context };

      case AuthState.EMAIL:
        if (event.type === AuthEventType.ENTER_IDENTIFIER) {

          const identifier = event.payload.identifier;

          if (!identifier) {
            return this.error(context, 'USER_NOT_FOUND');
          }

          return {
            state: AuthState.PASSWORD,
            context: { ...context, identifier }
          };
        }
        return { state, context };

      case AuthState.PASSWORD:
        if (event.type === AuthEventType.ENTER_PASSWORD) {

          const password = event.payload.password;

          if (!password) {
            return this.error(context, 'INVALID_CREDENTIALS');
          }

          const requiresOtp = true;

          if (requiresOtp) {
            return {
              state: AuthState.OTP,
              context
            };
          }

          return {
            state: AuthState.SUCCESS,
            context
          };
        }
        return { state, context };

      case AuthState.OTP:
        if (event.type === AuthEventType.VERIFY_OTP) {

          const otp = event.payload.otp;

          if (!otp) {
            return this.error(context, 'OTP_INVALID');
          }

          return {
            state: AuthState.SUCCESS,
            context
          };
        }
        return { state, context };

      default:
        return { state, context };
    }
  }

  private error(context: any, code: string) {
    return {
      state: context.state || AuthState.EMAIL,
      context: {
        ...context,
        error: code
      }
    };
  }
}
