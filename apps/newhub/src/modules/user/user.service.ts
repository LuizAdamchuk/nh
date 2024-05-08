import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, User as PrismaUser } from "@prisma/client";
import { PasswordService } from "../../auth/password.service";
import { transformStringFieldUpdateInput } from "../../prisma.util";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRecoverPasswordService } from "../user-recover-password/user-recover-password.service";
import { UserResetPasswordParams, UserResetPasswordBody } from "./dto";
import { UserResetPasswordValidations } from "./validations/UserResetPassword";

@Injectable()
export class UserService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService,
    protected readonly userRecoverPasswordService: UserRecoverPasswordService,
    protected readonly resetPasswordValidations: UserResetPasswordValidations
  ) {}

  async count(args: Omit<Prisma.UserCountArgs, "select">): Promise<number> {
    return this.prisma.user.count(args);
  }

  async users<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
  ): Promise<PrismaUser[]> {
    return this.prisma.user.findMany<Prisma.UserFindManyArgs>(args);
  }
  async user<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
  ): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique(args);
  }
  async createUser<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
  ): Promise<PrismaUser> {
    return this.prisma.user.create<T>({
      ...args,

      data: {
        ...args.data,
        password: await this.passwordService.hash(args.data.password),
      },
    });
  }
  async updateUser<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
  ): Promise<PrismaUser> {
    return this.prisma.user.update<T>({
      ...args,

      data: {
        ...args.data,

        password:
          args.data.password &&
          (await transformStringFieldUpdateInput(
            args.data.password,
            (password) => this.passwordService.hash(password)
          )),
      },
    });
  }
  async deleteUser<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
  ): Promise<PrismaUser> {
    return this.prisma.user.delete(args);
  }

  async resetPasswordUser(args: {
    where: UserResetPasswordParams;
    data: UserResetPasswordBody;
  }): Promise<PrismaUser> {
    const { where, data } = args;

    this.resetPasswordValidations.verifyPasswordsMatches(data);

    const [user] = await this.users({
      where: {
        email: {
          equals: where.email,
        },
      },
    });

    this.resetPasswordValidations.verifyUserExistence(user);

    const [userRecoverPassword] =
      await this.userRecoverPasswordService.userRecoverPasswords({
        where: {
          userId: user.id,
          token: where.token,
        },
      });

    this.resetPasswordValidations.verifyRecoverPasswordToken(
      userRecoverPassword
    );

    return this.updateUser({
      where: {
        id: user.id,
      },
      data: {
        password:
          args.data.newPassword &&
          (await transformStringFieldUpdateInput(
            args.data.newPassword,
            (password) => this.passwordService.hash(password)
          )),
      },
      select: {
        createdAt: true,
        email: true,
        firstName: true,
        id: true,
        lastName: true,
        roles: true,
        updatedAt: true,
        username: true,
      },
    });
  }

  // ---- Private ---- ///
  private isExpired(expirationDate: Date): boolean {
    return new Date(expirationDate) < new Date();
  }
}
