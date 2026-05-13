import { AuthStep } from "../constants/auth-step.constant";
import { AuthMode } from "../types/auth-mode.type";

export interface AuthFlowState {
  id: string;
  step: AuthStep;
  mode: AuthMode;

  email?: string;
  password?: string;

  verified?: boolean;
}