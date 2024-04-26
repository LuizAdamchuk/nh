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
import { UserVerificationCodeService } from "./user-verification-code.service";
import {
  UserVerificationCodeCreateInput,
  UserVerificationCodeFindManyArgs,
  UserVerificationCodeUpdateInput,
  UserVerificationCodeWhereUniqueInput,
} from "./dto";

@swagger.ApiTags("userVerificationCode")
@swagger.ApiBearerAuth()
@Controller("userVerificationCode")
export class UserVerificationCodeController {
  constructor(
    protected readonly userVerificationCodeService: UserVerificationCodeService
  ) {}

  @swagger.ApiCreatedResponse()
  @Post()
  create(@Body() data: UserVerificationCodeCreateInput) {
    return this.userVerificationCodeService.create({
      data: {
        ...data,

        user: data.user ? { connect: data.user } : undefined,
      },
    });
  }

  @ApiNestedQuery(UserVerificationCodeFindManyArgs)
  @Get()
  findAll(@Req() request: Request) {
    const args = plainToClass(UserVerificationCodeFindManyArgs, request.query);

    return this.userVerificationCodeService.findAll({
      ...args,
      select: {
        id: true,
        user: true,
      },
    });
  }

  @Get(":id")
  findOne(@Param() params: UserVerificationCodeWhereUniqueInput) {
    return this.userVerificationCodeService.findOne({
      where: params,
      select: {
        id: true,
      },
    });
  }

  @Patch(":id")
  update(
    @Param() params: UserVerificationCodeWhereUniqueInput,
    @Body() data: UserVerificationCodeUpdateInput
  ) {
    return this.userVerificationCodeService.update({
      where: params,
      data: {
        ...data,

        user: data.user ? { connect: data.user } : undefined,
      },
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userVerificationCodeService.remove(+id);
  }
}
