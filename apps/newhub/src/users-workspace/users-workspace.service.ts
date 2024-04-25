import { Injectable } from "@nestjs/common";
import { Prisma, UsersWorkspace as PrismaUsersWorkspace } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersWorkspaceService {
  constructor(protected readonly prisma: PrismaService) {}

  create(args: Prisma.UsersWorkspaceCreateArgs): Promise<PrismaUsersWorkspace> {
    return this.prisma.usersWorkspace.create({ ...args });
  }

  findAll(
    args: Prisma.UsersWorkspaceFindManyArgs
  ): Promise<PrismaUsersWorkspace[]> {
    return this.prisma.usersWorkspace.findMany<Prisma.UsersWorkspaceFindManyArgs>(
      args
    );
  }

  findOne(args: Prisma.UsersWorkspaceFindUniqueArgs) {
    return this.prisma.usersWorkspace.findUnique(args);
  }

  update(args: Prisma.UsersWorkspaceUpdateArgs): Promise<PrismaUsersWorkspace> {
    return this.prisma.usersWorkspace.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} usersWorkspace`;
  }
}
