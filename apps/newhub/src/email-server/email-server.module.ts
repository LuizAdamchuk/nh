import { Module } from "@nestjs/common";
import { EmailServerService } from "./email-server.service";
import { EmailServerController } from "./email-server.controller";
import { UserVerificationCodeModule } from "src/modules/user-verification-code/user-verification-code.module";
import { UserModule } from "src/modules/user/user.module";

@Module({
  imports: [UserVerificationCodeModule, UserModule],
  providers: [EmailServerService],
  controllers: [EmailServerController],
})
export class EmailServerModule {}
