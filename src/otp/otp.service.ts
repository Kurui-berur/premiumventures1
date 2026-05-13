import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpService {
      constructor(
    @InjectRepository(Otp)
    private repo: Repository<Otp>
  ) {}

   generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async send(email: string) {

    const code = this.generateCode();

    const otp = this.repo.create({
      email,
      code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 mins
    });

    await this.repo.save(otp);

    // 🚨 later replace with real email/SMS
    console.log(`📨 OTP for ${email}: ${code}`);
  }

  async verify(email: string, code: string) {

    const record = await this.repo.findOne({
      where: { email, code }
    });

    if (!record) return false;

    if (record.expiresAt < new Date()) return false;

    return true;
  }
}
