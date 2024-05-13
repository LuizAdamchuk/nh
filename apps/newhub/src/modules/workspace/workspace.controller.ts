import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as errors from "../../errors";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as nestAccessControl from "nest-access-control";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";

import { isRecordNotFoundError } from "../../prisma.util";
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
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
@common.Controller("workspace")
export class WorkspaceController {
  constructor(
    protected readonly service: WorkspaceService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Workspace })
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createWorkspace(
    @common.Body() data: WorkspaceCreateInput
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
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Workspace] })
  @ApiNestedQuery(WorkspaceFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async workspaces(@common.Req() request: Request): Promise<Workspace[]> {
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Workspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async workspace(
    @common.Param() params: WorkspaceWhereUniqueInput
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Workspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateWorkspace(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() data: WorkspaceUpdateInput
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Workspace })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteWorkspace(
    @common.Param() params: WorkspaceWhereUniqueInput
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Get("/:id/organizationsWorkspaces")
  @ApiNestedQuery(OrganizationsWorkspaceFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "OrganizationsWorkspace",
    action: "read",
    possession: "any",
  })
  async findOrganizationsWorkspaces(
    @common.Req() request: Request,
    @common.Param() params: WorkspaceWhereUniqueInput
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post("/:id/organizationsWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async connectOrganizationsWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: OrganizationsWorkspaceWhereUniqueInput[]
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
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id/organizationsWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async updateOrganizationsWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: OrganizationsWorkspaceWhereUniqueInput[]
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Delete("/:id/organizationsWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async disconnectOrganizationsWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: OrganizationsWorkspaceWhereUniqueInput[]
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Get("/:id/qlikWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "QlikWorkspace",
    action: "read",
    possession: "any",
  })
  @ApiNestedQuery(QlikWorkspaceFindManyArgs)
  async findQlikWorkspaces(
    @common.Req() request: Request,
    @common.Param() params: WorkspaceWhereUniqueInput
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
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post("/:id/qlikWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async connectQlikWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: QlikWorkspaceWhereUniqueInput[]
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id/qlikWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async updateQlikWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: QlikWorkspaceWhereUniqueInput[]
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Delete("/:id/qlikWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async disconnectQlikWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: QlikWorkspaceWhereUniqueInput[]
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Get("/:id/usersWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "UsersWorkspace",
    action: "read",
    possession: "any",
  })
  @ApiNestedQuery(UsersWorkspaceFindManyArgs)
  async findUsersWorkspaces(
    @common.Req() request: Request,
    @common.Param() params: WorkspaceWhereUniqueInput
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
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post("/:id/usersWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async connectUsersWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: UsersWorkspaceWhereUniqueInput[]
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id/usersWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async updateUsersWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: UsersWorkspaceWhereUniqueInput[]
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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Delete("/:id/usersWorkspaces")
  @nestAccessControl.UseRoles({
    resource: "Workspace",
    action: "update",
    possession: "any",
  })
  async disconnectUsersWorkspaces(
    @common.Param() params: WorkspaceWhereUniqueInput,
    @common.Body() body: UsersWorkspaceWhereUniqueInput[]
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
