import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
  Prisma,
  UserConfig as PrismaUserConfig,
  User as PrismaUser,
} from "@prisma/client";
@Injectable()
export class UserConfigService {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.UserConfigCountArgs, "select">
  ): Promise<number> {
    return this.prisma.userConfig.count(args);
  }

  async userConfigs<T extends Prisma.UserConfigFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserConfigFindManyArgs>
  ): Promise<PrismaUserConfig[]> {
    console.log("🚀 ~ UserConfigService ~ args:", args);

    return this.prisma.userConfig.findMany<Prisma.UserConfigFindManyArgs>(args);
  }
  async userConfig<T extends Prisma.UserConfigFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserConfigFindUniqueArgs>
  ): Promise<PrismaUserConfig | null> {
    console.log("🚀 ~ UserConfigService ~ args:", args);
    return this.prisma.userConfig.findUnique(args);
  }
  async createUserConfig<T extends Prisma.UserConfigCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserConfigCreateArgs>
  ): Promise<PrismaUserConfig> {
    return this.prisma.userConfig.create<T>(args);
  }
  async updateUserConfig<T extends Prisma.UserConfigUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserConfigUpdateArgs>
  ): Promise<PrismaUserConfig> {
    return this.prisma.userConfig.update<T>(args);
  }
  async deleteUserConfig<T extends Prisma.UserConfigDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserConfigDeleteArgs>
  ): Promise<PrismaUserConfig> {
    return this.prisma.userConfig.delete(args);
  }

  async getUser(parentId: string): Promise<PrismaUser | null> {
    return this.prisma.userConfig
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
