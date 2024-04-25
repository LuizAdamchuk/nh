import * as swagger from "@nestjs/swagger";
import { Request } from "express";
import { plainToClass } from "class-transformer";

import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { AclValidateRequestInterceptor } from "../interceptors/aclValidateRequest.interceptor";
import { ApiNestedQuery } from "../decorators/api-nested-query.decorator";

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
import { QlikIntegrationService } from "./qlikintegration.service";
import {
  QlikIntegrationCreateInput,
  QlikIntegrationFindManyArgs,
  QlikIntegrationUpdateInput,
  QlikIntegrationWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("qlikintegration")
@swagger.ApiBearerAuth()
@Controller("qlikintegration")
export class QlikIntegrationController {
  constructor(
    protected readonly qlikintegrationService: QlikIntegrationService
  ) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() createQlikIntegrationDto: QlikIntegrationCreateInput) {
    return this.qlikintegrationService.create({
      data: createQlikIntegrationDto,
    });
  }

  @ApiNestedQuery(QlikIntegrationFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(QlikIntegrationFindManyArgs, request.query);

    return this.qlikintegrationService.findAll({
      ...args,
      select: {
        id: true,
        alias: true,
        domain: true,
        qlikTheme: true,
      },
    });
  }

  @Get(":id")
  findOne(@Param() params: QlikIntegrationWhereUniqueInput) {
    return this.qlikintegrationService.findOne({
      where: params,
      select: {
        id: true,
        alias: true,
        domain: true,
        qlikTheme: true,
      },
    });
  }

  @Patch(":id")
  update(
    @Param() params: QlikIntegrationWhereUniqueInput,
    @Body() data: QlikIntegrationUpdateInput
  ) {
    return this.qlikintegrationService.update({
      where: params,
      data: data,
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.qlikintegrationService.remove(+id);
  }
}
