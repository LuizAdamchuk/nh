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
import { UserConfigService } from "./user-config.service";
import {
  UserConfigCreateInput,
  UserConfigFindManyArgs,
  UserConfigUpdateInput,
  UserConfigWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("userConfig")
@swagger.ApiBearerAuth()
@Controller("userConfig")
export class UserConfigController {
  constructor(protected readonly userConfigService: UserConfigService) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() data: UserConfigCreateInput) {
    return this.userConfigService.create({
      data: {
        ...data,

        user: data.user ? { connect: data.user } : undefined,
      },
    });
  }

  @ApiNestedQuery(UserConfigFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(UserConfigFindManyArgs, request.query);

    return this.userConfigService.findAll({
      ...args,
      select: {
        id: true,
        user: true,
        userId: true,
        language: true,
      },
    });
  }

  @Get(":id")
  findOne(@Param() params: UserConfigWhereUniqueInput) {
    return this.userConfigService.findOne({
      where: params,
      select: {
        id: true,
        user: true,
        userId: true,
        language: true,
      },
    });
  }

  @Patch(":id")
  update(
    @Param() params: UserConfigWhereUniqueInput,
    @Body() data: UserConfigUpdateInput
  ) {
    return this.userConfigService.update({
      where: params,
      data: {
        ...data,

        user: data.user ? { connect: data.user } : undefined,
      },
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userConfigService.remove(+id);
  }
}
