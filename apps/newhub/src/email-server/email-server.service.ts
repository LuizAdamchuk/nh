import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { UserVerificationCodeService } from "src/modules/user-verification-code/user-verification-code.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class EmailServerService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
    private readonly userVerificationCodeService: UserVerificationCodeService
  ) {}

  async sendConfirmationEmail(email: string, confirmUrl: string) {
    const [user] = await this.userService.users({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!user) throw new BadRequestException("No user founded.");

    const userVericationCode =
      await this.userVerificationCodeService.createUserVerificationCode({
        data: {
          expiresAt: new Date(),
          verificationCode: String(this.generateRandom6DigitNumber()),
          userId: user.id,
        },
      });

    console.log(
      "🚀 ~ EmailServerService ~ sendConfirmationEmail ~ userVericationCode:",
      userVericationCode
    );

    await this.mailerService.sendMail({
      to: email,
      from: "noresponse@cluster.io",
      subject: "Confirmação de Email",
      html: `<p>Por favor, confirme seu email clicando <a href="${confirmUrl}">aqui</a>.</p>`,
    });
  }

  async validateVerificationCode(id: string, code: string) {}

  // --- Private --- //

  private generateRandom6DigitNumber(): number {
    return parseInt(Math.random().toString().substring(2, 8), 10);
  }
}
