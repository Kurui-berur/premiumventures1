import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])], // add your entities here
  providers: [OtpService],
  controllers: [OtpController],
  exports: [OtpService]
})
export class OtpModule {}
