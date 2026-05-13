import { Injectable } from '@nestjs/common';
import { FlowHandler } from 'src/flow/contracts/flow-handler.interface';
import { OtpService } from 'src/otp/otp.service';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../jwt.services';
import { FlowEvent } from 'src/flow/types/flow-event';
import { AuthState } from '../constants/auth-states';

@Injectable()
export class AuthFlowHandlerService implements FlowHandler{

    //entity services inject
constructor(
    private users:UsersService,private otp:OtpService,private token:TokenService
){}
  async  handle(params: { state: string; event: FlowEvent; sessionId?: string; context?: any; }):
  Promise<{ state: string; context: any; blocks?: any[]; }> {

      // ✅ destructure params
    const {state,event,context} = params;

    //init

    if (state==AuthState.INIT){
        return{
            state:AuthState.EMAIL,
            context:{}


        }
    }
    //email
    if (state==AuthState.EMAIL){
        if (event.type=='SUBMIT_EMAIL'){

            const email=event.payload.email;

            //user 
            const user=await this.users.findByEmail(email);

            return{
                state:AuthState.PASSWORD,
                context:{
                    email,
                    mode:user?'LOGIN':'REGISTER'
                }
            }
         }
            }
    //password
    if (state==AuthState.PASSWORD){
        if (event.type=='SUBMIT_PASSWORD'){

            const password=event.payload.password;

            if(context.mode=='LOGIN'){
                const user=await this.users.findByEmail(context.email);

                if(!user) throw new Error('User not found');

                const valid=await this.users.verifyPassword(user,password);

                if (!valid) throw new Error('Invalid password');

                await this.otp.send(context.email);

                return{
                    state:AuthState.OTP,
                    context
                }
            }

            
            // REGISTER FLOW
        // ------------------------------------------
        await this.otp.send(context.email);

        return {
          state: AuthState.OTP,
          context: {
            ...context,
            password
          }
        };
      }
    }





    
    }
  


}
