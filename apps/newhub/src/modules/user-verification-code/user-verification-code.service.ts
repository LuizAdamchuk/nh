import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  UserVerificationCode as PrismaUserVerificationCode,
  User as PrismaUser,
} from "@prisma/client";

export class UserVerificationCodeService {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.UserVerificationCodeCountArgs, "select">
  ): Promise<number> {
    return this.prisma.userVerificationCode.count(args);
  }

  async userVerificationCodes<
    T extends Prisma.UserVerificationCodeFindManyArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.UserVerificationCodeFindManyArgs>
  ): Promise<PrismaUserVerificationCode[]> {
    return this.prisma.userVerificationCode.findMany<Prisma.UserVerificationCodeFindManyArgs>(
      args
    );
  }
  async userVerificationCode<
    T extends Prisma.UserVerificationCodeFindUniqueArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.UserVerificationCodeFindUniqueArgs>
  ): Promise<PrismaUserVerificationCode | null> {
    return this.prisma.userVerificationCode.findUnique(args);
  }
  async createUserVerificationCode<
    T extends Prisma.UserVerificationCodeCreateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.UserVerificationCodeCreateArgs>
  ): Promise<PrismaUserVerificationCode> {
    return this.prisma.userVerificationCode.create<T>(args);
  }
  async updateUserVerificationCode<
    T extends Prisma.UserVerificationCodeUpdateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.UserVerificationCodeUpdateArgs>
  ): Promise<PrismaUserVerificationCode> {
    return this.prisma.userVerificationCode.update<T>(args);
  }
  async deleteUserVerificationCode<
    T extends Prisma.UserVerificationCodeDeleteArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.UserVerificationCodeDeleteArgs>
  ): Promise<PrismaUserVerificationCode> {
    return this.prisma.userVerificationCode.delete(args);
  }

  async getUser(parentId: string): Promise<PrismaUser | null> {
    return this.prisma.userVerificationCode
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
