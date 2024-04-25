import { Injectable } from "@nestjs/common";
import { Prisma, Workspace as PrismaWorkspace } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class WorkspaceService {
  constructor(protected readonly prisma: PrismaService) {}

  create(args: Prisma.WorkspaceCreateArgs): Promise<PrismaWorkspace> {
    return this.prisma.workspace.create({ ...args });
  }

  findAll(args: Prisma.WorkspaceFindManyArgs): Promise<PrismaWorkspace[]> {
    return this.prisma.workspace.findMany<Prisma.WorkspaceFindManyArgs>(args);
  }

  findOne(args: Prisma.WorkspaceFindUniqueArgs) {
    return this.prisma.workspace.findUnique(args);
  }

  update(args: Prisma.WorkspaceUpdateArgs): Promise<PrismaWorkspace> {
    return this.prisma.workspace.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
