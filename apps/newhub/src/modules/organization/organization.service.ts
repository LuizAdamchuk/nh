import { Injectable } from "@nestjs/common";
import { Prisma, Organization as PrismaOrganization } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrganizationService {
  constructor(protected readonly prisma: PrismaService) {}

  create(args: Prisma.OrganizationCreateArgs): Promise<PrismaOrganization> {
    return this.prisma.organization.create({ ...args });
  }

  findAll(
    args: Prisma.OrganizationFindManyArgs
  ): Promise<PrismaOrganization[]> {
    return this.prisma.organization.findMany<Prisma.OrganizationFindManyArgs>(
      args
    );
  }

  findOne(args: Prisma.OrganizationFindUniqueArgs) {
    return this.prisma.organization.findUnique(args);
  }

  update(args: Prisma.OrganizationUpdateArgs): Promise<PrismaOrganization> {
    return this.prisma.organization.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
