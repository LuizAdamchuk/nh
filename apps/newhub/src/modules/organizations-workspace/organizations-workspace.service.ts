import { Injectable } from "@nestjs/common";
import {
  Prisma,
  OrganizationsWorkspace as PrismaOrganizationsWorkspace,
} from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrganizationsWorkspaceService {
  constructor(protected readonly prisma: PrismaService) {}

  create(
    args: Prisma.OrganizationsWorkspaceCreateArgs
  ): Promise<PrismaOrganizationsWorkspace> {
    return this.prisma.organizationsWorkspace.create({ ...args });
  }

  findAll(
    args: Prisma.OrganizationsWorkspaceFindManyArgs
  ): Promise<PrismaOrganizationsWorkspace[]> {
    return this.prisma.organizationsWorkspace.findMany<Prisma.OrganizationsWorkspaceFindManyArgs>(
      args
    );
  }

  findOne(args: Prisma.OrganizationsWorkspaceFindUniqueArgs) {
    return this.prisma.organizationsWorkspace.findUnique(args);
  }

  update(
    args: Prisma.OrganizationsWorkspaceUpdateArgs
  ): Promise<PrismaOrganizationsWorkspace> {
    return this.prisma.organizationsWorkspace.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} organizationsWorkspace`;
  }
}
