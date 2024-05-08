import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { EmailServerService } from "./email-server.service";
import { MailerInput, MailerValidation, RecoverPasswordInput } from "./dto";

@swagger.ApiTags("mailer")
@common.Controller("mailer")
export class EmailServerController {
  constructor(private readonly emailServerService: EmailServerService) {}

  @common.Post("confirmation")
  async sendConfirmationEmail(
    @common.Body() data: MailerInput,
    @common.Res() response: any
  ): Promise<any> {
    const { email } = data;

    await this.emailServerService.sendConfirmationEmail(email);

    return response.status(200).json({
      message: "Email successfully sent.",
    });
  }

  @common.Get("validation/:id/:code")
  async validateVerificationCode(
    @common.Param() data: MailerValidation,
    @common.Res() response: any
  ): Promise<any> {
    const { id, code } = data;
    await this.emailServerService.validateVerificationCode(id, code);

    return response.status(200).json({
      message: "User validated.",
    });
  }

  @common.Post("recover-password")
  async sendRecoverPasswordEmail(
    @common.Body() data: RecoverPasswordInput,
    @common.Res() response: any
  ): Promise<any> {
    const { email } = data;
    await this.emailServerService.sendRecoverPasswordEmail(email);

    return response.status(200).json({ message: "Email successfully sent." });
  }
}
