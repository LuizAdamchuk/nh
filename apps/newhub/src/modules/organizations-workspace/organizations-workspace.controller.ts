import * as swagger from "@nestjs/swagger";
import { Request } from "express";
import { plainToClass } from "class-transformer";

import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";

import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OrganizationsWorkspaceService } from "./organizations-workspace.service";
import {
  OrganizationsWorkspaceCreateInput,
  OrganizationsWorkspaceFindManyArgs,
  OrganizationsWorkspaceUpdateInput,
  OrganizationsWorkspaceWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("organizationsWorkspace")
@swagger.ApiBearerAuth()
@Controller("organizationsWorkspace")
export class OrganizationsWorkspaceController {
  constructor(
    protected readonly organizationsWorkspaceService: OrganizationsWorkspaceService
  ) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() data: OrganizationsWorkspaceCreateInput) {
    return this.organizationsWorkspaceService.create({
      data: {
        ...data,

        organization: data.organization
          ? {
              connect: data.organization,
            }
          : undefined,

        workspace: data.workspace
          ? {
              connect: data.workspace,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        workspace: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @ApiNestedQuery(OrganizationsWorkspaceFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(
      OrganizationsWorkspaceFindManyArgs,
      request.query
    );

    return this.organizationsWorkspaceService.findAll({
      ...args,
      select: {
        createdAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        workspace: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @Get(":id")
  findOne(@Param() params: OrganizationsWorkspaceWhereUniqueInput) {
    return this.organizationsWorkspaceService.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        workspace: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @Patch(":id")
  update(
    @Param() params: OrganizationsWorkspaceWhereUniqueInput,
    @Body() data: OrganizationsWorkspaceUpdateInput
  ) {
    return this.organizationsWorkspaceService.update({
      where: params,
      data: {
        ...data,

        organization: data.organization
          ? {
              connect: data.organization,
            }
          : undefined,

        workspace: data.workspace
          ? {
              connect: data.workspace,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        workspace: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.organizationsWorkspaceService.remove(+id);
  }
}
