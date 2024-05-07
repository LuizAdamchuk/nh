import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { UserVerificationCodeService } from "src/modules/user-verification-code/user-verification-code.service";
import { UserService } from "src/modules/user/user.service";
const { MAILER_VALIDATION_URL } = process.env;

@Injectable()
export class EmailServerService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
    private readonly userVerificationCodeService: UserVerificationCodeService
  ) {}

  async sendConfirmationEmail(email: string) {
    const [user] = await this.userService.users({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!user) throw new BadRequestException("No user founded.");

    const setExpireDate = new Date().setHours(new Date().getHours() + 2);

    const userVericationCode =
      await this.userVerificationCodeService.createUserVerificationCode({
        data: {
          expiresAt: new Date(setExpireDate),
          verificationCode: String(this.generateRandom6DigitNumber()),
          userId: user.id,
        },
      });
    const confirmUrl = `${MAILER_VALIDATION_URL}/${user.id}/${userVericationCode.verificationCode}`;

    await this.mailerService.sendMail({
      to: email,
      from: "noresponse@cluster.io",
      subject: "Confirmação de Email",
      html: `<p>Por favor, confirme seu email clicando <a href="${confirmUrl}">aqui</a>.</p>`,
    });
  }

  async validateVerificationCode(userId: string, code: string): Promise<void> {
    const [userVerificationCode] =
      await this.userVerificationCodeService.userVerificationCodes({
        where: {
          userId: userId,
          verificationCode: code,
        },
      });

    const user = await this.userService.user({
      where: {
        id: userId,
      },
    });

    if (!userVerificationCode)
      throw new BadRequestException("Verification Code error.");

    if (new Date(userVerificationCode.expiresAt) < new Date())
      throw new BadRequestException("Verification Code expired.");

    if (user?.status) throw new BadRequestException("User already validated.");

    await this.userService.updateUser({
      where: {
        id: userId,
      },
      data: {
        status: true,
      },
    });
  }

  // --- Private --- //

  private generateRandom6DigitNumber(): number {
    return parseInt(Math.random().toString().substring(2, 8), 10);
  }
}
