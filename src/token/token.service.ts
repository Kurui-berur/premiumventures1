import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';

import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
      constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
   private config: ConfigService
  ) {
    this.secret = this.config.get<string>('JWT_SECRET');
    this.expiresIn = this.config.get<string>('JWT_EXPIRES_IN') || '7d';
  }  


  private secret;
  private expiresIn;

  generate(user: any) {

    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
      {
        sub: user.id,
        email: user.email
      },
      this.secret,
      {
        expiresIn: this.expiresIn
      }
    );
  }
}



