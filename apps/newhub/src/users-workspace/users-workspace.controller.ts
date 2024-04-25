import * as swagger from "@nestjs/swagger";
import { Request } from "express";
import { plainToClass } from "class-transformer";

import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { AclValidateRequestInterceptor } from "../interceptors/aclValidateRequest.interceptor";
import { ApiNestedQuery } from "../decorators/api-nested-query.decorator";

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
import { UsersWorkspaceService } from "./users-workspace.service";
import {
  UsersWorkspaceCreateInput,
  UsersWorkspaceFindManyArgs,
  UsersWorkspaceUpdateInput,
  UsersWorkspaceWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("usersWorkspace")
@swagger.ApiBearerAuth()
@Controller("usersWorkspace")
export class UsersWorkspaceController {
  constructor(
    protected readonly usersWorkspaceService: UsersWorkspaceService
  ) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() data: UsersWorkspaceCreateInput) {
    return this.usersWorkspaceService.create({
      data: {
        ...data,

        user: data.user
          ? {
              connect: data.user,
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
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },

        workspace: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @ApiNestedQuery(UsersWorkspaceFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(UsersWorkspaceFindManyArgs, request.query);

    return this.usersWorkspaceService.findAll({
      ...args,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },

        workspace: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @Get(":id")
  findOne(@Param() params: UsersWorkspaceWhereUniqueInput) {
    return this.usersWorkspaceService.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },

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
    @Param() params: UsersWorkspaceWhereUniqueInput,
    @Body() data: UsersWorkspaceUpdateInput
  ) {
    return this.usersWorkspaceService.update({
      where: params,
      data: {
        ...data,

        user: data.user
          ? {
              connect: data.user,
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
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },

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
    return this.usersWorkspaceService.remove(+id);
  }
}
