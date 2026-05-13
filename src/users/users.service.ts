import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
    private repo: Repository<User>
    ) {}
    async findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }   
    async createUser(data: Partial<User>) {
        const hashed = await bcrypt.hash(data.password!, 10);

        const user = this.repo.create({
      ...data,
      password: hashed
    });
    return this.repo.save(user);
    }

     async verifyPassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }
}
