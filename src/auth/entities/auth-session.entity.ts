export interface AuthSession {
  sessionId: string;
  step: string;
  userId?: string;

  otp?: string;
  otpExpiresAt?: number;

  attempts: number;
}
