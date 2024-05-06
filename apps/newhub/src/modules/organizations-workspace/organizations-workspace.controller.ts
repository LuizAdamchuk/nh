import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";

import { OrganizationsWorkspaceService } from "./organizations-workspace.service";
import {
  OrganizationsWorkspace,
  OrganizationsWorkspaceCreateInput,
  OrganizationsWorkspaceFindManyArgs,
  OrganizationsWorkspaceUpdateInput,
  OrganizationsWorkspaceWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("organizationsWorkspace")
@swagger.ApiBearerAuth()
@common.Controller("organizationsWorkspace")
export class OrganizationsWorkspaceController {
  constructor(protected readonly service: OrganizationsWorkspaceService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: OrganizationsWorkspace })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createOrganizationsWorkspace(
    @common.Body() data: OrganizationsWorkspaceCreateInput
  ): Promise<OrganizationsWorkspace> {
    return await this.service.createOrganizationsWorkspace({
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

  @common.Get()
  @swagger.ApiOkResponse({ type: [OrganizationsWorkspace] })
  @ApiNestedQuery(OrganizationsWorkspaceFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async organizationsWorkspaces(
    @common.Req() request: Request
  ): Promise<OrganizationsWorkspace[]> {
    const args = plainToClass(
      OrganizationsWorkspaceFindManyArgs,
      request.query
    );

    return this.service.organizationsWorkspaces({
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

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: OrganizationsWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async organizationsWorkspace(
    @common.Param() params: OrganizationsWorkspaceWhereUniqueInput
  ): Promise<OrganizationsWorkspace | null> {
    const result = await this.service.organizationsWorkspace({
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
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: OrganizationsWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateOrganizationsWorkspace(
    @common.Param() params: OrganizationsWorkspaceWhereUniqueInput,
    @common.Body() data: OrganizationsWorkspaceUpdateInput
  ): Promise<OrganizationsWorkspace | null> {
    try {
      return await this.service.updateOrganizationsWorkspace({
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
  @swagger.ApiOkResponse({ type: OrganizationsWorkspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteOrganizationsWorkspace(
    @common.Param() params: OrganizationsWorkspaceWhereUniqueInput
  ): Promise<OrganizationsWorkspace | null> {
    try {
      return await this.service.deleteOrganizationsWorkspace({
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
