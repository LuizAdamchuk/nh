import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";

import { QlikIntegrationService } from "./qlik-integration.service";
import {
  QlikIntegrationCreateInput,
  QlikIntegration,
  QlikIntegrationFindManyArgs,
  QlikIntegrationWhereUniqueInput,
  QlikIntegrationUpdateInput,
} from "./dto";

import {
  QlikWorkspaceFindManyArgs,
  QlikWorkspace,
  QlikWorkspaceWhereUniqueInput,
} from "../qlik-workspace/dto";

@swagger.ApiTags("qlikIntegration")
@swagger.ApiBearerAuth()
@common.Controller("qlikIntegration")
export class QlikIntegrationController {
  constructor(protected readonly service: QlikIntegrationService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: QlikIntegration })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createQlikIntegration(
    @common.Body() data: QlikIntegrationCreateInput
  ): Promise<QlikIntegration> {
    return await this.service.createQlikIntegration({
      data: data,
      select: {
        alias: true,
        createdAt: true,
        domain: true,
        id: true,
        issuer: true,
        keyId: true,
        qlikId: true,
        qlikTheme: true,
        qlikWebIntegrationId: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [QlikIntegration] })
  @ApiNestedQuery(QlikIntegrationFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async qlikIntegrations(
    @common.Req() request: Request
  ): Promise<QlikIntegration[]> {
    const args = plainToClass(QlikIntegrationFindManyArgs, request.query);
    return this.service.qlikIntegrations({
      ...args,
      select: {
        alias: true,
        createdAt: true,
        domain: true,
        id: true,
        issuer: true,
        keyId: true,
        qlikId: true,
        qlikTheme: true,
        qlikWebIntegrationId: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: QlikIntegration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async qlikIntegration(
    @common.Param() params: QlikIntegrationWhereUniqueInput
  ): Promise<QlikIntegration | null> {
    const result = await this.service.qlikIntegration({
      where: params,
      select: {
        alias: true,
        createdAt: true,
        domain: true,
        id: true,
        issuer: true,
        keyId: true,
        qlikId: true,
        qlikTheme: true,
        qlikWebIntegrationId: true,
        updatedAt: true,
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
  @swagger.ApiOkResponse({ type: QlikIntegration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateQlikIntegration(
    @common.Param() params: QlikIntegrationWhereUniqueInput,
    @common.Body() data: QlikIntegrationUpdateInput
  ): Promise<QlikIntegration | null> {
    try {
      return await this.service.updateQlikIntegration({
        where: params,
        data: data,
        select: {
          alias: true,
          createdAt: true,
          domain: true,
          id: true,
          issuer: true,
          keyId: true,
          qlikId: true,
          qlikTheme: true,
          qlikWebIntegrationId: true,
          updatedAt: true,
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
  @swagger.ApiOkResponse({ type: QlikIntegration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteQlikIntegration(
    @common.Param() params: QlikIntegrationWhereUniqueInput
  ): Promise<QlikIntegration | null> {
    try {
      return await this.service.deleteQlikIntegration({
        where: params,
        select: {
          alias: true,
          createdAt: true,
          domain: true,
          id: true,
          issuer: true,
          keyId: true,
          qlikId: true,
          qlikTheme: true,
          qlikWebIntegrationId: true,
          updatedAt: true,
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

  @common.Get("/:id/qlikWorkspaces")
  @ApiNestedQuery(QlikWorkspaceFindManyArgs)
  async findQlikWorkspaces(
    @common.Req() request: Request,
    @common.Param() params: QlikIntegrationWhereUniqueInput
  ): Promise<QlikWorkspace[]> {
    const query = plainToClass(QlikWorkspaceFindManyArgs, request.query);
    const results = await this.service.findQlikWorkspaces(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/qlikWorkspaces")
  async connectQlikWorkspaces(
    @common.Param() params: QlikIntegrationWhereUniqueInput,
    @common.Body() body: QlikWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      qlikWorkspaces: {
        connect: body,
      },
    };
    await this.service.updateQlikIntegration({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/qlikWorkspaces")
  async updateQlikWorkspaces(
    @common.Param() params: QlikIntegrationWhereUniqueInput,
    @common.Body() body: QlikWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      qlikWorkspaces: {
        set: body,
      },
    };
    await this.service.updateQlikIntegration({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/qlikWorkspaces")
  async disconnectQlikWorkspaces(
    @common.Param() params: QlikIntegrationWhereUniqueInput,
    @common.Body() body: QlikWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      qlikWorkspaces: {
        disconnect: body,
      },
    };
    await this.service.updateQlikIntegration({
      where: params,
      data,
      select: { id: true },
    });
  }
}
