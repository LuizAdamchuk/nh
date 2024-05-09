import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Credentials } from "./Credentials";
import { UserInfo } from "./UserInfo";

@ApiTags("auth")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  async login(@Body() body: Credentials): Promise<UserInfo> {
    console.log("🚀 ~ AuthController ~ login ~ body:", body);
    return this.authService.login(body);
  }
}
