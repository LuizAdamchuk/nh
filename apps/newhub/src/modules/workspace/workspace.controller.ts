import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";

import { WorkspaceService } from "../workspace/workspace.service";

import {
  Workspace,
  WorkspaceCreateInput,
  WorkspaceFindManyArgs,
  WorkspaceWhereUniqueInput,
  WorkspaceUpdateInput,
} from "./dto";
import {
  OrganizationsWorkspaceFindManyArgs,
  OrganizationsWorkspace,
  OrganizationsWorkspaceWhereUniqueInput,
} from "../organizations-workspace/dto";
import {
  QlikWorkspaceFindManyArgs,
  QlikWorkspace,
  QlikWorkspaceWhereUniqueInput,
} from "../qlik-workspace/dto";
import {
  UsersWorkspaceFindManyArgs,
  UsersWorkspace,
  UsersWorkspaceWhereUniqueInput,
} from "../users-workspace/dto";

@swagger.ApiTags("workspace")
@swagger.ApiBearerAuth()
@Controller("workspace")
export class WorkspaceController {
  constructor(protected readonly service: WorkspaceService) {}
  @Post()
  @swagger.ApiCreatedResponse({ type: Workspace })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createWorkspace(
    @Body() data: WorkspaceCreateInput
  ): Promise<Workspace> {
    return await this.service.createWorkspace({
      data: data,
      select: {
        createdAt: true,
        id: true,
        name: true,
        slug: true,
        updatedAt: true,
      },
    });
  }

  @Get()
  @swagger.ApiOkResponse({ type: [Workspace] })
  @ApiNestedQuery(WorkspaceFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async workspaces(@Req() request: Request): Promise<Workspace[]> {
    const args = plainToClass(WorkspaceFindManyArgs, request.query);
    return this.service.workspaces({
      ...args,
      select: {
        createdAt: true,
        id: true,
        name: true,
        slug: true,
        updatedAt: true,
      },
    });
  }

  @Get("/:id")
  @swagger.ApiOkResponse({ type: Workspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async workspace(
    @Param() params: WorkspaceWhereUniqueInput
  ): Promise<Workspace | null> {
    const result = await this.service.workspace({
      where: params,
      select: {
        createdAt: true,
        id: true,
        name: true,
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

  @Patch("/:id")
  @swagger.ApiOkResponse({ type: Workspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateWorkspace(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() data: WorkspaceUpdateInput
  ): Promise<Workspace | null> {
    try {
      return await this.service.updateWorkspace({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          name: true,
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

  @Delete("/:id")
  @swagger.ApiOkResponse({ type: Workspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteWorkspace(
    @Param() params: WorkspaceWhereUniqueInput
  ): Promise<Workspace | null> {
    try {
      return await this.service.deleteWorkspace({
        where: params,
        select: {
          createdAt: true,
          id: true,
          name: true,
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

  @Get("/:id/organizationsWorkspaces")
  @ApiNestedQuery(OrganizationsWorkspaceFindManyArgs)
  async findOrganizationsWorkspaces(
    @Req() request: Request,
    @Param() params: WorkspaceWhereUniqueInput
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

  @Post("/:id/organizationsWorkspaces")
  async connectOrganizationsWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: OrganizationsWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      organizationsWorkspaces: {
        connect: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Patch("/:id/organizationsWorkspaces")
  async updateOrganizationsWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: OrganizationsWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      organizationsWorkspaces: {
        set: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Delete("/:id/organizationsWorkspaces")
  async disconnectOrganizationsWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: OrganizationsWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      organizationsWorkspaces: {
        disconnect: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Get("/:id/qlikWorkspaces")
  @ApiNestedQuery(QlikWorkspaceFindManyArgs)
  async findQlikWorkspaces(
    @Req() request: Request,
    @Param() params: WorkspaceWhereUniqueInput
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

  @Post("/:id/qlikWorkspaces")
  async connectQlikWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: QlikWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      qlikWorkspaces: {
        connect: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Patch("/:id/qlikWorkspaces")
  async updateQlikWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: QlikWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      qlikWorkspaces: {
        set: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Delete("/:id/qlikWorkspaces")
  async disconnectQlikWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: QlikWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      qlikWorkspaces: {
        disconnect: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Get("/:id/usersWorkspaces")
  @ApiNestedQuery(UsersWorkspaceFindManyArgs)
  async findUsersWorkspaces(
    @Req() request: Request,
    @Param() params: WorkspaceWhereUniqueInput
  ): Promise<UsersWorkspace[]> {
    const query = plainToClass(UsersWorkspaceFindManyArgs, request.query);
    const results = await this.service.findUsersWorkspaces(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @Post("/:id/usersWorkspaces")
  async connectUsersWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: UsersWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      usersWorkspaces: {
        connect: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Patch("/:id/usersWorkspaces")
  async updateUsersWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: UsersWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      usersWorkspaces: {
        set: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }

  @Delete("/:id/usersWorkspaces")
  async disconnectUsersWorkspaces(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() body: UsersWorkspaceWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      usersWorkspaces: {
        disconnect: body,
      },
    };
    await this.service.updateWorkspace({
      where: params,
      data,
      select: { id: true },
    });
  }
}
