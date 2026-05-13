import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

  constructor(private jwt: JwtService) {}

  generate(userId: string) {
    return {
      accessToken: this.jwt.sign({ sub: userId }, { expiresIn: '15m' }),
      refreshToken: this.jwt.sign({ sub: userId }, { expiresIn: '7d' }),
    };
  }
}
