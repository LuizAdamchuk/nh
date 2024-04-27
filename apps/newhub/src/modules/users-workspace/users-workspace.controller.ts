import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";

import { UsersWorkspaceService } from "./users-workspace.service";
import {
  UsersWorkspace,
  UsersWorkspaceCreateInput,
  UsersWorkspaceFindManyArgs,
  UsersWorkspaceUpdateInput,
  UsersWorkspaceWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("usersWorkspace")
@swagger.ApiBearerAuth()
@common.Controller("usersWorkspace")
export class UsersWorkspaceController {
  constructor(protected readonly service: UsersWorkspaceService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: UsersWorkspace })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createUsersWorkspace(
    @common.Body() data: UsersWorkspaceCreateInput
  ): Promise<UsersWorkspace> {
    return await this.service.createUsersWorkspace({
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

  @common.Get()
  @swagger.ApiOkResponse({ type: [UsersWorkspace] })
  @ApiNestedQuery(UsersWorkspaceFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async usersWorkspaces(
    @common.Req() request: Request
  ): Promise<UsersWorkspace[]> {
    const args = plainToClass(UsersWorkspaceFindManyArgs, request.query);
    return this.service.usersWorkspaces({
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

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: UsersWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async usersWorkspace(
    @common.Param() params: UsersWorkspaceWhereUniqueInput
  ): Promise<UsersWorkspace | null> {
    const result = await this.service.usersWorkspace({
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
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: UsersWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateUsersWorkspace(
    @common.Param() params: UsersWorkspaceWhereUniqueInput,
    @common.Body() data: UsersWorkspaceUpdateInput
  ): Promise<UsersWorkspace | null> {
    try {
      return await this.service.updateUsersWorkspace({
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
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: UsersWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteUsersWorkspace(
    @common.Param() params: UsersWorkspaceWhereUniqueInput
  ): Promise<UsersWorkspace | null> {
    try {
      return await this.service.deleteUsersWorkspace({
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
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
