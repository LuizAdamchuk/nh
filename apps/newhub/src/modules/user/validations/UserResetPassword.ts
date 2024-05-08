import {
  UserRecoverPassword as PrismaUserRecoverPassword,
  User as PrismaUser,
} from "@prisma/client";

import { BadRequestException, Injectable } from "@nestjs/common";
import { UserResetPasswordBody } from "../dto";

@Injectable()
export class UserResetPasswordValidations {
  verifyPasswordsMatches(data: UserResetPasswordBody) {
    if (
      !data.newPassword ||
      !data.confirmPassword ||
      data.newPassword !== data.confirmPassword
    ) {
      throw new Error("Passwords do not match.");
    }
  }
  // TODO: [1] Colocar em algum service global
  verifyUserExistence(user: PrismaUser) {
    if (!user) throw new BadRequestException("User not founded.");
  }

  verifyRecoverPasswordToken(user: PrismaUserRecoverPassword) {
    if (!user) throw new BadRequestException("Recover Token invalid.");
    if (this.isExpired(user.expiresAt))
      throw new BadRequestException("Recover Token expired.");
  }
  // TODO: [1] Colocar em algum service global

  isExpired(expirationDate: Date): boolean {
    return new Date(expirationDate) < new Date();
  }
}
