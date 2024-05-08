import { Module } from "@nestjs/common";
import { UserRecoverPasswordService } from "./user-recover-password.service";
import { UserRecoverPasswordController } from "./user-recover-password.controller";

@Module({
  controllers: [UserRecoverPasswordController],
  providers: [UserRecoverPasswordService],
  exports: [UserRecoverPasswordService],
})
export class UserRecoverPasswordModule {}
