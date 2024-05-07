import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { EmailServerService } from "./email-server.service";
import { MailerInput } from "./dto";

@swagger.ApiTags("mailer")
@swagger.ApiBearerAuth()
@common.Controller("mailer")
export class EmailServerController {
  constructor(private readonly emailServerService: EmailServerService) {}

  @common.Post("confirmation")
  async sendConfirmationEmail(
    @common.Body() data: MailerInput,
    @common.Res() response: any
  ): Promise<any> {
    const { email } = data;

    const confirmUrl = "http://example.com/confirm";
    await this.emailServerService.sendConfirmationEmail(email, confirmUrl);

    return response.status(200).json({
      message: "Email enviado com sucesso!",
    });
  }
}
