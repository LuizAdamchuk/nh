import { Injectable } from "@nestjs/common";
import { Prisma, UserConfig as PrismaUserConfig } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserConfigService {
  constructor(protected readonly prisma: PrismaService) {}

  create(args: Prisma.UserConfigCreateArgs): Promise<PrismaUserConfig> {
    return this.prisma.userConfig.create({ ...args });
  }

  findAll(args: Prisma.UserConfigFindManyArgs): Promise<PrismaUserConfig[]> {
    return this.prisma.userConfig.findMany<Prisma.UserConfigFindManyArgs>(args);
  }

  findOne(args: Prisma.UserConfigFindUniqueArgs) {
    return this.prisma.userConfig.findUnique(args);
  }

  update(args: Prisma.UserConfigUpdateArgs): Promise<PrismaUserConfig> {
    return this.prisma.userConfig.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userConfig`;
  }
}
