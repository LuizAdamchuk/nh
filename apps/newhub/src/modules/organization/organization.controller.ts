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
import { OrganizationService } from "./organization.service";
import {
  OrganizationCreateInput,
  OrganizationFindManyArgs,
  OrganizationWhereUniqueInput,
  OrganizationUpdateInput,
} from "./dto";

@swagger.ApiTags("organization")
@swagger.ApiBearerAuth()
@Controller("organization")
export class OrganizationController {
  constructor(protected readonly organizationService: OrganizationService) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() createOrganizationDto: OrganizationCreateInput) {
    return this.organizationService.create({ data: createOrganizationDto });
  }

  @ApiNestedQuery(OrganizationFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(OrganizationFindManyArgs, request.query);

    return this.organizationService.findAll({
      ...args,
      select: {
        id: true,
        domain: true,
        name: true,
        organizationsWorkspaces: true,
        slug: true,
        owner: true,
      },
    });
  }

  @Get(":id")
  findOne(@Param() params: OrganizationWhereUniqueInput) {
    return this.organizationService.findOne({
      where: params,
      select: {
        id: true,
        domain: true,
        name: true,
        owner: true,
        slug: true,
      },
    });
  }

  @Patch(":id")
  update(
    @Param() params: OrganizationWhereUniqueInput,
    @Body() data: OrganizationUpdateInput
  ) {
    return this.organizationService.update({
      where: params,
      data: data,
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.organizationService.remove(+id);
  }
}
