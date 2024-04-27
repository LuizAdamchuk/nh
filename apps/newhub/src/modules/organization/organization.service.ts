import { Injectable } from "@nestjs/common";
import {
  Prisma,
  Organization as PrismaOrganization,
  OrganizationsWorkspace as PrismaOrganizationsWorkspace,
} from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class OrganizationService {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.OrganizationCountArgs, "select">
  ): Promise<number> {
    return this.prisma.organization.count(args);
  }

  async organizations<T extends Prisma.OrganizationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationFindManyArgs>
  ): Promise<PrismaOrganization[]> {
    console.log("Prisma object:", this.prisma);

    return this.prisma.organization.findMany<Prisma.OrganizationFindManyArgs>(
      args
    );
  }
  async organization<T extends Prisma.OrganizationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationFindUniqueArgs>
  ): Promise<PrismaOrganization | null> {
    return this.prisma.organization.findUnique(args);
  }
  async createOrganization<T extends Prisma.OrganizationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationCreateArgs>
  ): Promise<PrismaOrganization> {
    return this.prisma.organization.create<T>(args);
  }
  async updateOrganization<T extends Prisma.OrganizationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationUpdateArgs>
  ): Promise<PrismaOrganization> {
    return this.prisma.organization.update<T>(args);
  }
  async deleteOrganization<T extends Prisma.OrganizationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationDeleteArgs>
  ): Promise<PrismaOrganization> {
    return this.prisma.organization.delete(args);
  }

  async findOrganizationsWorkspaces(
    parentId: string,
    args: Prisma.OrganizationsWorkspaceFindManyArgs
  ): Promise<PrismaOrganizationsWorkspace[]> {
    return this.prisma.organization
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .organizationsWorkspaces(args);
  }
}
