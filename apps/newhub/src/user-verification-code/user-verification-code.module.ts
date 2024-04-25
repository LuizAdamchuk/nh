import { Module } from '@nestjs/common';
import { UserVerificationCodeService } from './user-verification-code.service';
import { UserVerificationCodeController } from './user-verification-code.controller';

@Module({
  controllers: [UserVerificationCodeController],
  providers: [UserVerificationCodeService],
})
export class UserVerificationCodeModule {}
