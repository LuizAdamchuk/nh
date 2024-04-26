import * as swagger from "@nestjs/swagger";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import * as errors from "../../errors";

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
import { QlikWorkspaceService } from "./qlik-workspace.service";
import {
  QlikWorkspaceCreateInput,
  QlikWorkspaceFindManyArgs,
  QlikWorkspaceUpdateInput,
  QlikWorkspaceWhereUniqueInput,
} from "./dto";
import { isRecordNotFoundError } from "src/prisma.util";

@swagger.ApiTags("qlikWorkspace")
@swagger.ApiBearerAuth()
@Controller("qlikWorkspace")
export class QlikWorkspaceController {
  constructor(protected readonly qlikWorkspaceService: QlikWorkspaceService) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() data: QlikWorkspaceCreateInput) {
    return this.qlikWorkspaceService.create({
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

  @ApiNestedQuery(QlikWorkspaceFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(QlikWorkspaceFindManyArgs, request.query);

    return this.qlikWorkspaceService.findAll({
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

  @Get(":id")
  findOne(@Param() params: QlikWorkspaceWhereUniqueInput) {
    return this.qlikWorkspaceService.findOne({
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
  }

  @Patch(":id")
  update(
    @Param() params: QlikWorkspaceWhereUniqueInput,
    @Body() data: QlikWorkspaceUpdateInput
  ) {
    try {
      return this.qlikWorkspaceService.update({
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

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.qlikWorkspaceService.remove(+id);
  }
}
