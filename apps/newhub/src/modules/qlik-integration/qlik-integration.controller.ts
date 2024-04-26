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
import { QlikIntegrationService } from "./qlik-integration.service";
import {
  QlikIntegrationCreateInput,
  QlikIntegrationFindManyArgs,
  QlikIntegrationUpdateInput,
  QlikIntegrationWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("qlikIntegration")
@swagger.ApiBearerAuth()
@Controller("qlikIntegration")
export class QlikIntegrationController {
  constructor(
    protected readonly qlikIntegrationService: QlikIntegrationService
  ) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() createQlikIntegrationDto: QlikIntegrationCreateInput) {
    return this.qlikIntegrationService.create({
      data: createQlikIntegrationDto,
    });
  }

  @ApiNestedQuery(QlikIntegrationFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(QlikIntegrationFindManyArgs, request.query);

    return this.qlikIntegrationService.findAll({
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
    return this.qlikIntegrationService.findOne({
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
    return this.qlikIntegrationService.update({
      where: params,
      data: data,
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.qlikIntegrationService.remove(+id);
  }
}
