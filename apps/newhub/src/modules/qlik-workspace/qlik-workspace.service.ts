import { Injectable } from "@nestjs/common";
import { Prisma, QlikWorkspace as PrismaQlikWorkspace } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QlikWorkspaceService {
  constructor(protected readonly prisma: PrismaService) {}

  create(args: Prisma.QlikWorkspaceCreateArgs): Promise<PrismaQlikWorkspace> {
    return this.prisma.qlikWorkspace.create({ ...args });
  }

  findAll(
    args: Prisma.QlikWorkspaceFindManyArgs
  ): Promise<PrismaQlikWorkspace[]> {
    return this.prisma.qlikWorkspace.findMany<Prisma.QlikWorkspaceFindManyArgs>(
      args
    );
  }

  findOne(args: Prisma.QlikWorkspaceFindUniqueArgs) {
    return this.prisma.qlikWorkspace.findUnique(args);
  }

  update(args: Prisma.QlikWorkspaceUpdateArgs): Promise<PrismaQlikWorkspace> {
    return this.prisma.qlikWorkspace.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} qikWorkspace`;
  }
}
