import { Injectable } from "@nestjs/common";
import {
  Prisma,
  UserVerificationCode as PrismaUserVerificationCode,
} from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserVerificationCodeService {
  constructor(protected readonly prisma: PrismaService) {}

  create(
    args: Prisma.UserVerificationCodeCreateArgs
  ): Promise<PrismaUserVerificationCode> {
    return this.prisma.userVerificationCode.create({ ...args });
  }

  findAll(
    args: Prisma.UserVerificationCodeFindManyArgs
  ): Promise<PrismaUserVerificationCode[]> {
    return this.prisma.userVerificationCode.findMany<Prisma.UserVerificationCodeFindManyArgs>(
      args
    );
  }

  findOne(args: Prisma.UserVerificationCodeFindUniqueArgs) {
    return this.prisma.userVerificationCode.findUnique(args);
  }

  update(
    args: Prisma.UserVerificationCodeUpdateArgs
  ): Promise<PrismaUserVerificationCode> {
    return this.prisma.userVerificationCode.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userVerificationCode`;
  }
}
