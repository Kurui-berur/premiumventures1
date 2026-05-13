import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TokenService {

  constructor(private jwt: JwtService) {}

  generate(user: any) {
    return {
      accessToken: this.jwt.sign(
        { sub: user.id },
        { expiresIn: '15m' }
      ),
      refreshToken: this.jwt.sign(
        { sub: user.id },
        { expiresIn: '7d' }
      )
    };
  }
}
