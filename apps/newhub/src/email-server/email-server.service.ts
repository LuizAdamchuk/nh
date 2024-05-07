import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { UserVerificationCodeService } from "src/modules/user-verification-code/user-verification-code.service";
import { UserService } from "src/modules/user/user.service";
import { confirmUrl, getEmailValidationConfig } from "./inputs";

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

    const userVericationCode =
      await this.userVerificationCodeService.createUserVerificationCode({
        data: {
          expiresAt: this.calculateExpirationTime(),
          verificationCode: this.generateRandom6DigitNumber(),
          userId: user.id,
        },
      });

    await this.mailerService.sendMail(
      getEmailValidationConfig(
        email,
        confirmUrl(user.id, userVericationCode.verificationCode)
      )
    );
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

    this.validations(userVerificationCode, user);

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

  private validations(userVerificationCode: any, user: any) {
    if (!userVerificationCode)
      throw new BadRequestException("Verification Code error.");

    if (this.isExpired(userVerificationCode.expiresAt))
      throw new BadRequestException("Verification Code expired.");

    if (user?.status) throw new BadRequestException("User already validated.");
  }

  private generateRandom6DigitNumber(): string {
    return String(parseInt(Math.random().toString().substring(2, 8), 10));
  }

  private calculateExpirationTime(): Date {
    return new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now
  }

  private isExpired(expirationDate: Date): boolean {
    return new Date(expirationDate) < new Date();
  }
}
