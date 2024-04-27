import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  QlikIntegration as PrismaQlikIntegration,
  QlikWorkspace as PrismaQlikWorkspace,
} from "@prisma/client";
@Injectable()
export class QlikIntegrationService {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.QlikIntegrationCountArgs, "select">
  ): Promise<number> {
    return this.prisma.qlikIntegration.count(args);
  }

  async qlikIntegrations<T extends Prisma.QlikIntegrationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikIntegrationFindManyArgs>
  ): Promise<PrismaQlikIntegration[]> {
    return this.prisma.qlikIntegration.findMany<Prisma.QlikIntegrationFindManyArgs>(
      args
    );
  }
  async qlikIntegration<T extends Prisma.QlikIntegrationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikIntegrationFindUniqueArgs>
  ): Promise<PrismaQlikIntegration | null> {
    return this.prisma.qlikIntegration.findUnique(args);
  }
  async createQlikIntegration<T extends Prisma.QlikIntegrationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikIntegrationCreateArgs>
  ): Promise<PrismaQlikIntegration> {
    return this.prisma.qlikIntegration.create<T>(args);
  }
  async updateQlikIntegration<T extends Prisma.QlikIntegrationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikIntegrationUpdateArgs>
  ): Promise<PrismaQlikIntegration> {
    return this.prisma.qlikIntegration.update<T>(args);
  }
  async deleteQlikIntegration<T extends Prisma.QlikIntegrationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikIntegrationDeleteArgs>
  ): Promise<PrismaQlikIntegration> {
    return this.prisma.qlikIntegration.delete(args);
  }

  async findQlikWorkspaces(
    parentId: string,
    args: Prisma.QlikWorkspaceFindManyArgs
  ): Promise<PrismaQlikWorkspace[]> {
    return this.prisma.qlikIntegration
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .qlikWorkspaces(args);
  }
}
