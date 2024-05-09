import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";

import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";

import { QlikWorkspaceService } from "./qlik-workspace.service";

import {
  QlikWorkspace,
  QlikWorkspaceCreateInput,
  QlikWorkspaceFindManyArgs,
  QlikWorkspaceUpdateInput,
  QlikWorkspaceWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("qlikWorkspace")
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard)
@common.Controller("qlikWorkspace")
export class QlikWorkspaceController {
  constructor(protected readonly service: QlikWorkspaceService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: QlikWorkspace })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createQlikWorkspace(
    @common.Body() data: QlikWorkspaceCreateInput
  ): Promise<QlikWorkspace> {
    return await this.service.createQlikWorkspace({
      data: {
        ...data,

        qlikintegration: data.qlikintegration
          ? {
              connect: data.qlikintegration,
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

        qlikintegration: {
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

  @common.Get()
  @swagger.ApiOkResponse({ type: [QlikWorkspace] })
  @ApiNestedQuery(QlikWorkspaceFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async qlikWorkspaces(
    @common.Req() request: Request
  ): Promise<QlikWorkspace[]> {
    const args = plainToClass(QlikWorkspaceFindManyArgs, request.query);
    return this.service.qlikWorkspaces({
      ...args,
      select: {
        createdAt: true,
        id: true,

        qlikintegration: {
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

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: QlikWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async qlikWorkspace(
    @common.Param() params: QlikWorkspaceWhereUniqueInput
  ): Promise<QlikWorkspace | null> {
    const result = await this.service.qlikWorkspace({
      where: params,
      select: {
        createdAt: true,
        id: true,

        qlikintegration: {
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
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: QlikWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateQlikWorkspace(
    @common.Param() params: QlikWorkspaceWhereUniqueInput,
    @common.Body() data: QlikWorkspaceUpdateInput
  ): Promise<QlikWorkspace | null> {
    try {
      return await this.service.updateQlikWorkspace({
        where: params,
        data: {
          ...data,

          qlikintegration: data.qlikintegration
            ? {
                connect: data.qlikintegration,
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

          qlikintegration: {
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
  @swagger.ApiOkResponse({ type: QlikWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteQlikWorkspace(
    @common.Param() params: QlikWorkspaceWhereUniqueInput
  ): Promise<QlikWorkspace | null> {
    try {
      return await this.service.deleteQlikWorkspace({
        where: params,
        select: {
          createdAt: true,
          id: true,

          qlikintegration: {
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
