import { Injectable } from "@nestjs/common";
import {
  Prisma,
  Organization as PrismaOrganization,
  OrganizationsWorkspace as PrismaOrganizationsWorkspace,
} from "@prisma/client";

import { PrismaService } from "../../prisma/prisma.service";
import { WorkspaceService } from "../workspace/workspace.service";
import { OrganizationsWorkspaceService } from "../organizations-workspace/organizations-workspace.service";
@Injectable()
export class OrganizationService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly workspaceService: WorkspaceService,
    protected readonly organizationWorkspaceService: OrganizationsWorkspaceService
  ) {}

  async count(
    args: Omit<Prisma.OrganizationCountArgs, "select">
  ): Promise<number> {
    return this.prisma.organization.count(args);
  }

  async organizations<T extends Prisma.OrganizationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationFindManyArgs>
  ): Promise<PrismaOrganization[]> {
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

  // ----- Custom Servicos ----- //

  async createOrganizationWorkspaceAndLink<
    T extends Prisma.OrganizationCreateArgs
  >(
    args: Prisma.SelectSubset<T, Prisma.OrganizationCreateArgs>
  ): Promise<PrismaOrganization> {
    const organization = await this.prisma.organization.create<T>(args);
    console.log("🚀 ~ OrganizationService ~ organization:", organization);

    const workspace = await this.workspaceService.createWorkspace({
      data: {
        name: organization.name,
        slug: `${organization.name}-slug`,
        organizationsWorkspaces: {
          create: {
            id: organization.id,
          },
        },
      },
    });
    console.log("🚀 ~ OrganizationService ~ workspace:", workspace);

    const organizationWorkspaceRelation =
      await this.organizationWorkspaceService.createOrganizationsWorkspace({
        data: {
          organizationId: organization.id,
          workspaceId: workspace.id,
        },
      });
    console.log(
      "🚀 ~ OrganizationService ~ organizationWorkspaceRelation:",
      organizationWorkspaceRelation
    );

    return organization;
  }
}
