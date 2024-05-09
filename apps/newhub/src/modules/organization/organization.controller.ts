import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";

import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";

import { OrganizationService } from "./organization.service";
import {
  OrganizationCreateInput,
  Organization,
  OrganizationFindManyArgs,
  OrganizationWhereUniqueInput,
  OrganizationUpdateInput,
} from "./dto";
import {
  OrganizationsWorkspaceFindManyArgs,
  OrganizationsWorkspace,
  OrganizationsWorkspaceWhereUniqueInput,
} from "../organizations-workspace/dto";
import { UserData } from "src/auth/userData.decorator";
import { User } from "../user/dto";
import { BadRequestException } from "@nestjs/common";

@swagger.ApiTags("organization")
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard)
@common.Controller("organization")
export class OrganizationController {
  constructor(protected readonly service: OrganizationService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Organization })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createOrganization(
    @common.Body() data: OrganizationCreateInput,
    @UserData() user: any
  ): Promise<Organization> {
    if (!user.status)
      throw new BadRequestException("You must validate your user.");

    return await this.service.createOrganization({
      data: data,
      select: {
        createdAt: true,
        domain: true,
        id: true,
        name: true,
        owner: true,
        slug: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Organization] })
  @ApiNestedQuery(OrganizationFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async organizations(@common.Req() request: Request): Promise<Organization[]> {
    const args = plainToClass(OrganizationFindManyArgs, request.query);

    return this.service.organizations({
      ...args,
      select: {
        createdAt: true,
        domain: true,
        id: true,
        name: true,
        owner: true,
        slug: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Organization })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async organization(
    @common.Param() params: OrganizationWhereUniqueInput
  ): Promise<Organization | null> {
    const result = await this.service.organization({
      where: params,
      select: {
        createdAt: true,
        domain: true,
        id: true,
        name: true,
        owner: true,
        slug: true,
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
  @swagger.ApiOkResponse({ type: Organization })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateOrganization(
    @common.Param() params: OrganizationWhereUniqueInput,
    @common.Body() data: OrganizationUpdateInput
  ): Promise<Organization | null> {
    try {
      return await this.service.updateOrganization({
        where: params,
        data: data,
        select: {
          createdAt: true,
          domain: true,
          id: true,
          name: true,
          owner: true,
          slug: true,
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
  @swagger.ApiOkResponse({ type: Organization })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteOrganization(
    @common.Param() params: OrganizationWhereUniqueInput
  ): Promise<Organization | null> {
    try {
      return await this.service.deleteOrganization({
        where: params,
        select: {
          createdAt: true,
          domain: true,
          id: true,
          name: true,
          owner: true,
          slug: true,
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

  @common.Get("/:id/organizationsWorkspaces")
  @ApiNestedQuery(OrganizationsWorkspaceFindManyArgs)
  async findOrganizationsWorkspaces(
    @common.Req() request: Request,
    @common.Param() params: OrganizationWhereUniqueInput
  ): Promise<OrganizationsWorkspace[]> {
    const query = plainToClass(
      OrganizationsWorkspaceFindManyArgs,
      request.query
    );
    const results = await this.service.findOrganizationsWorkspaces(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/organizationsWorkspaces")
  @swagger.ApiCreatedResponse({ type: Organization })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async connectOrganizationsWorkspaces(
    @common.Body() data: OrganizationCreateInput,
    @UserData() user: any
  ): Promise<Organization> {
    if (!user.status)
      throw new BadRequestException("You must validate your user.");
    return await this.service.createOrganizationWorkspaceAndLink({
      data: data,
      select: {
        createdAt: true,
        domain: true,
        id: true,
        name: true,
        owner: true,
        slug: true,
        updatedAt: true,
      },
    });
  }

  @common.Patch("/:id/organizationsWorkspaces")
  async updateOrganizationsWorkspaces(
    @common.Param() params: OrganizationWhereUniqueInput,
    @common.Body() body: OrganizationsWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      organizationsWorkspaces: {
        set: body,
      },
    };
    await this.service.updateOrganization({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/organizationsWorkspaces")
  async disconnectOrganizationsWorkspaces(
    @common.Param() params: OrganizationWhereUniqueInput,
    @common.Body() body: OrganizationsWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      organizationsWorkspaces: {
        disconnect: body,
      },
    };
    await this.service.updateOrganization({
      where: params,
      data,
      select: { id: true },
    });
  }
}
