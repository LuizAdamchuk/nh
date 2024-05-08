import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  UserRecoverPassword as PrismaUserRecoverPassword,
  User as PrismaUser,
} from "@prisma/client";
@Injectable()
export class UserRecoverPasswordService {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.UserRecoverPasswordCountArgs, "select">
  ): Promise<number> {
    return this.prisma.userRecoverPassword.count(args);
  }

  async userRecoverPasswords<T extends Prisma.UserRecoverPasswordFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserRecoverPasswordFindManyArgs>
  ): Promise<PrismaUserRecoverPassword[]> {
    return this.prisma.userRecoverPassword.findMany<Prisma.UserRecoverPasswordFindManyArgs>(
      args
    );
  }
  async userRecoverPassword<T extends Prisma.UserRecoverPasswordFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserRecoverPasswordFindUniqueArgs>
  ): Promise<PrismaUserRecoverPassword | null> {
    return this.prisma.userRecoverPassword.findUnique(args);
  }
  async createUserRecoverPassword<
    T extends Prisma.UserRecoverPasswordCreateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.UserRecoverPasswordCreateArgs>
  ): Promise<PrismaUserRecoverPassword> {
    return this.prisma.userRecoverPassword.create<T>(args);
  }
  async updateUserRecoverPassword<
    T extends Prisma.UserRecoverPasswordUpdateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.UserRecoverPasswordUpdateArgs>
  ): Promise<PrismaUserRecoverPassword> {
    return this.prisma.userRecoverPassword.update<T>(args);
  }
  async deleteUserRecoverPassword<
    T extends Prisma.UserRecoverPasswordDeleteArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.UserRecoverPasswordDeleteArgs>
  ): Promise<PrismaUserRecoverPassword> {
    return this.prisma.userRecoverPassword.delete(args);
  }

  async getUser(parentId: string): Promise<PrismaUser | null> {
    return this.prisma.userRecoverPassword
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
