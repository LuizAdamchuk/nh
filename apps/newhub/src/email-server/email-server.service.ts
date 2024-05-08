import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { UserVerificationCodeService } from "src/modules/user-verification-code/user-verification-code.service";
import { UserService } from "src/modules/user/user.service";
import {
  confirmUrl,
  getEmailRecoverPasswordConfig,
  getEmailValidationConfig,
  recoverPasswordUrl,
} from "./inputs";
import { UserRecoverPasswordService } from "src/modules/user-recover-password/user-recover-password.service";
import * as crypto from "crypto";
import { UserVerificationCodeValidations } from "./validations/VerificationCode";

@Injectable()
export class EmailServerService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
    private readonly userVerificationCodeService: UserVerificationCodeService,
    private readonly userRecoverPasswordService: UserRecoverPasswordService,
    private readonly userVerificationCodeValidations: UserVerificationCodeValidations
  ) {}

  async sendConfirmationEmail(email: string) {
    const [user] = await this.userService.users({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!user) throw new BadRequestException("User not founded.");

    const userVericationCode =
      await this.userVerificationCodeService.createUserVerificationCode({
        data: {
          expiresAt: this.calculateExpirationTime(2),
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
    const user = await this.userService.user({
      where: {
        id: userId,
      },
    });

    this.userVerificationCodeValidations.verifyUserExistence(user);

    const [userVerificationCode] =
      await this.userVerificationCodeService.userVerificationCodes({
        where: {
          userId: userId,
          verificationCode: code,
        },
      });

    this.userVerificationCodeValidations.verifyVerificationCode(
      userVerificationCode
    );

    await this.userService.updateUser({
      where: {
        id: userId,
      },
      data: {
        status: true,
      },
    });
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const [user] = await this.userService.users({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!user) throw new BadRequestException("User not founded.");

    const token = this.generateRecoverPasswordToken();

    await this.userRecoverPasswordService.createUserRecoverPassword({
      data: {
        token,
        expiresAt: this.calculateExpirationTime(1),
        userId: user.id,
      },
    });

    await this.mailerService.sendMail(
      getEmailRecoverPasswordConfig(email, recoverPasswordUrl(email, token))
    );
  }

  // --- Private --- //

  private generateRandom6DigitNumber(): string {
    return String(parseInt(Math.random().toString().substring(2, 8), 10));
  }

  private calculateExpirationTime(timeInHour: number): Date {
    return new Date(Date.now() + timeInHour * 60 * 60 * 1000);
  }

  private generateRecoverPasswordToken(): string {
    return crypto.randomBytes(20).toString("hex");
  }
}
