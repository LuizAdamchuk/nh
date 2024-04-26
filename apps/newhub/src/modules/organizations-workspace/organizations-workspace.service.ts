import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  OrganizationsWorkspace as PrismaOrganizationsWorkspace,
  Organization as PrismaOrganization,
  Workspace as PrismaWorkspace,
} from "@prisma/client";

export class OrganizationsWorkspaceService {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.OrganizationsWorkspaceCountArgs, "select">
  ): Promise<number> {
    return this.prisma.organizationsWorkspace.count(args);
  }

  async organizationsWorkspaces<
    T extends Prisma.OrganizationsWorkspaceFindManyArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.OrganizationsWorkspaceFindManyArgs>
  ): Promise<PrismaOrganizationsWorkspace[]> {
    return this.prisma.organizationsWorkspace.findMany<Prisma.OrganizationsWorkspaceFindManyArgs>(
      args
    );
  }
  async organizationsWorkspace<
    T extends Prisma.OrganizationsWorkspaceFindUniqueArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.OrganizationsWorkspaceFindUniqueArgs>
  ): Promise<PrismaOrganizationsWorkspace | null> {
    return this.prisma.organizationsWorkspace.findUnique(args);
  }
  async createOrganizationsWorkspace<
    T extends Prisma.OrganizationsWorkspaceCreateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.OrganizationsWorkspaceCreateArgs>
  ): Promise<PrismaOrganizationsWorkspace> {
    return this.prisma.organizationsWorkspace.create<T>(args);
  }
  async updateOrganizationsWorkspace<
    T extends Prisma.OrganizationsWorkspaceUpdateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.OrganizationsWorkspaceUpdateArgs>
  ): Promise<PrismaOrganizationsWorkspace> {
    return this.prisma.organizationsWorkspace.update<T>(args);
  }
  async deleteOrganizationsWorkspace<
    T extends Prisma.OrganizationsWorkspaceDeleteArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.OrganizationsWorkspaceDeleteArgs>
  ): Promise<PrismaOrganizationsWorkspace> {
    return this.prisma.organizationsWorkspace.delete(args);
  }

  async getOrganization(parentId: string): Promise<PrismaOrganization | null> {
    return this.prisma.organizationsWorkspace
      .findUnique({
        where: { id: parentId },
      })
      .organization();
  }

  async getWorkspace(parentId: string): Promise<PrismaWorkspace | null> {
    return this.prisma.organizationsWorkspace
      .findUnique({
        where: { id: parentId },
      })
      .workspace();
  }
}
