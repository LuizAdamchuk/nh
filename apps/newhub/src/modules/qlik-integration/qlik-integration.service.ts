import { Injectable } from "@nestjs/common";
import {
  Prisma,
  QlikIntegration as PrismaQlikIntegration,
} from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QlikIntegrationService {
  constructor(protected readonly prisma: PrismaService) {}

  create(
    args: Prisma.QlikIntegrationCreateArgs
  ): Promise<PrismaQlikIntegration> {
    return this.prisma.qlikIntegration.create({ ...args });
  }

  findAll(
    args: Prisma.QlikIntegrationFindManyArgs
  ): Promise<PrismaQlikIntegration[]> {
    return this.prisma.qlikIntegration.findMany<Prisma.QlikIntegrationFindManyArgs>(
      args
    );
  }

  findOne(args: Prisma.QlikIntegrationFindUniqueArgs) {
    return this.prisma.qlikIntegration.findUnique(args);
  }

  update(
    args: Prisma.QlikIntegrationUpdateArgs
  ): Promise<PrismaQlikIntegration> {
    return this.prisma.qlikIntegration.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} qlikintegration`;
  }
}
