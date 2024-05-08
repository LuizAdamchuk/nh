import { Module } from "@nestjs/common";
import { EmailServerService } from "./email-server.service";
import { EmailServerController } from "./email-server.controller";
import { UserVerificationCodeModule } from "src/modules/user-verification-code/user-verification-code.module";
import { UserModule } from "src/modules/user/user.module";
import { UserRecoverPasswordModule } from "src/modules/user-recover-password/user-recover-password.module";
import { UserVerificationCodeValidations } from "./validations/VerificationCode";

@Module({
  imports: [UserVerificationCodeModule, UserModule, UserRecoverPasswordModule],
  providers: [EmailServerService, UserVerificationCodeValidations],
  controllers: [EmailServerController],
})
export class EmailServerModule {}
