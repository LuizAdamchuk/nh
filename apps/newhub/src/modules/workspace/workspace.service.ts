import { Injectable } from "@nestjs/common";
import {
  Prisma,
  Workspace as PrismaWorkspace,
  OrganizationsWorkspace as PrismaOrganizationsWorkspace,
  QlikWorkspace as PrismaQlikWorkspace,
  UsersWorkspace as PrismaUsersWorkspace,
} from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
@Injectable()
export class WorkspaceService {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.WorkspaceCountArgs, "select">
  ): Promise<number> {
    return this.prisma.workspace.count(args);
  }

  async workspaces<T extends Prisma.WorkspaceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkspaceFindManyArgs>
  ): Promise<PrismaWorkspace[]> {
    return this.prisma.workspace.findMany<Prisma.WorkspaceFindManyArgs>(args);
  }
  async workspace<T extends Prisma.WorkspaceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkspaceFindUniqueArgs>
  ): Promise<PrismaWorkspace | null> {
    return this.prisma.workspace.findUnique(args);
  }
  async createWorkspace<T extends Prisma.WorkspaceCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkspaceCreateArgs>
  ): Promise<PrismaWorkspace> {
    console.log("Prisma object:", this.prisma);
    return this.prisma.workspace.create<T>(args);
  }
  async updateWorkspace<T extends Prisma.WorkspaceUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkspaceUpdateArgs>
  ): Promise<PrismaWorkspace> {
    return this.prisma.workspace.update<T>(args);
  }
  async deleteWorkspace<T extends Prisma.WorkspaceDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.WorkspaceDeleteArgs>
  ): Promise<PrismaWorkspace> {
    return this.prisma.workspace.delete(args);
  }

  async findOrganizationsWorkspaces(
    parentId: string,
    args: Prisma.OrganizationsWorkspaceFindManyArgs
  ): Promise<PrismaOrganizationsWorkspace[]> {
    return this.prisma.workspace
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .organizationsWorkspaces(args);
  }

  async findQlikWorkspaces(
    parentId: string,
    args: Prisma.QlikWorkspaceFindManyArgs
  ): Promise<PrismaQlikWorkspace[]> {
    return this.prisma.workspace
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .qlikWorkspaces(args);
  }

  async findUsersWorkspaces(
    parentId: string,
    args: Prisma.UsersWorkspaceFindManyArgs
  ): Promise<PrismaUsersWorkspace[]> {
    return this.prisma.workspace
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .usersWorkspaces(args);
  }
}
