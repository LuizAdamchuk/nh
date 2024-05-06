import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../../auth/auth.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
