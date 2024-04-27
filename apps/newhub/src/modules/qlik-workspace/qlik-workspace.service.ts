import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  QlikWorkspace as PrismaQlikWorkspace,
  QlikIntegration as PrismaQlikIntegration,
  Workspace as PrismaWorkspace,
} from "@prisma/client";
@Injectable()
export class QlikWorkspaceService {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.QlikWorkspaceCountArgs, "select">
  ): Promise<number> {
    return this.prisma.qlikWorkspace.count(args);
  }

  async qlikWorkspaces<T extends Prisma.QlikWorkspaceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikWorkspaceFindManyArgs>
  ): Promise<PrismaQlikWorkspace[]> {
    return this.prisma.qlikWorkspace.findMany<Prisma.QlikWorkspaceFindManyArgs>(
      args
    );
  }
  async qlikWorkspace<T extends Prisma.QlikWorkspaceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikWorkspaceFindUniqueArgs>
  ): Promise<PrismaQlikWorkspace | null> {
    return this.prisma.qlikWorkspace.findUnique(args);
  }
  async createQlikWorkspace<T extends Prisma.QlikWorkspaceCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikWorkspaceCreateArgs>
  ): Promise<PrismaQlikWorkspace> {
    return this.prisma.qlikWorkspace.create<T>(args);
  }
  async updateQlikWorkspace<T extends Prisma.QlikWorkspaceUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikWorkspaceUpdateArgs>
  ): Promise<PrismaQlikWorkspace> {
    return this.prisma.qlikWorkspace.update<T>(args);
  }
  async deleteQlikWorkspace<T extends Prisma.QlikWorkspaceDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.QlikWorkspaceDeleteArgs>
  ): Promise<PrismaQlikWorkspace> {
    return this.prisma.qlikWorkspace.delete(args);
  }

  async getQlikintegration(
    parentId: string
  ): Promise<PrismaQlikIntegration | null> {
    return this.prisma.qlikWorkspace
      .findUnique({
        where: { id: parentId },
      })
      .qlikintegration();
  }

  async getWorkspace(parentId: string): Promise<PrismaWorkspace | null> {
    return this.prisma.qlikWorkspace
      .findUnique({
        where: { id: parentId },
      })
      .workspace();
  }
}
