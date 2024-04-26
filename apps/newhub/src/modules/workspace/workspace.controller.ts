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
import { WorkspaceService } from "./workspace.service";
import {
  WorkspaceCreateInput,
  WorkspaceFindManyArgs,
  WorkspaceUpdateInput,
  WorkspaceWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("workspace")
@swagger.ApiBearerAuth()
@Controller("workspace")
export class WorkspaceController {
  constructor(protected readonly workspaceService: WorkspaceService) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() createWorkspaceDto: WorkspaceCreateInput) {
    return this.workspaceService.create({ data: createWorkspaceDto });
  }

  @ApiNestedQuery(WorkspaceFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(WorkspaceFindManyArgs, request.query);

    return this.workspaceService.findAll({
      ...args,
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }

  @Get(":id")
  findOne(@Param() params: WorkspaceWhereUniqueInput) {
    return this.workspaceService.findOne({
      where: params,
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }

  @Patch(":id")
  update(
    @Param() params: WorkspaceWhereUniqueInput,
    @Body() data: WorkspaceUpdateInput
  ) {
    return this.workspaceService.update({
      where: params,
      data: data,
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workspaceService.remove(+id);
  }
}
