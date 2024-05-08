import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../../auth/auth.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";
import { UserRecoverPasswordModule } from "../user-recover-password/user-recover-password.module";
import { UserResetPasswordValidations } from "./validations/UserResetPassword";

@Module({
  imports: [forwardRef(() => AuthModule), UserRecoverPasswordModule],
  controllers: [UserController],
  providers: [UserService, UserResolver, UserResetPasswordValidations],
  exports: [UserService],
})
export class UserModule {}
