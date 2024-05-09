import {
  UserVerificationCode as PrismaUserVerificationCode,
  User as PrismaUser,
} from "@prisma/client";

import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class UserVerificationCodeValidations {
  // TODO: [1] Colocar em algum service global
  verifyUserExistence(user: PrismaUser | null) {
    if (!user) throw new BadRequestException("User not founded.");
    if (user.status) throw new BadRequestException("User already validated.");
  }

  verifyVerificationCode(userVerificationCode: PrismaUserVerificationCode) {
    if (!userVerificationCode)
      throw new BadRequestException("Verification Code error.");

    if (this.isExpired(userVerificationCode.expiresAt))
      throw new BadRequestException("Verification Code expired.");
  }
  // TODO: [1] Colocar em algum service global
  isExpired(expirationDate: Date): boolean {
    return new Date(expirationDate) < new Date();
  }
}
