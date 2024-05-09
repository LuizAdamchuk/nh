import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";

import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { UserVerificationCodeService } from "./user-verification-code.service";
import {
  UserVerificationCodeCreateInput,
  UserVerificationCode,
  UserVerificationCodeFindManyArgs,
  UserVerificationCodeWhereUniqueInput,
  UserVerificationCodeUpdateInput,
} from "./dto";

@swagger.ApiTags("userVerificationCode")
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard)
@common.Controller("userVerificationCode")
export class UserVerificationCodeController {
  constructor(protected readonly service: UserVerificationCodeService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: UserVerificationCode })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createUserVerificationCode(
    @common.Body() data: UserVerificationCodeCreateInput
  ): Promise<UserVerificationCode> {
    return await this.service.createUserVerificationCode({
      data: {
        ...data,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        expiresAt: true,
        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },

        verificationCode: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [UserVerificationCode] })
  @ApiNestedQuery(UserVerificationCodeFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async userVerificationCodes(
    @common.Req() request: Request
  ): Promise<UserVerificationCode[]> {
    const args = plainToClass(UserVerificationCodeFindManyArgs, request.query);
    return this.service.userVerificationCodes({
      ...args,
      select: {
        createdAt: true,
        expiresAt: true,
        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },

        verificationCode: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: UserVerificationCode })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async userVerificationCode(
    @common.Param() params: UserVerificationCodeWhereUniqueInput
  ): Promise<UserVerificationCode | null> {
    const result = await this.service.userVerificationCode({
      where: params,
      select: {
        createdAt: true,
        expiresAt: true,
        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },

        verificationCode: true,
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
  @swagger.ApiOkResponse({ type: UserVerificationCode })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateUserVerificationCode(
    @common.Param() params: UserVerificationCodeWhereUniqueInput,
    @common.Body() data: UserVerificationCodeUpdateInput
  ): Promise<UserVerificationCode | null> {
    try {
      return await this.service.updateUserVerificationCode({
        where: params,
        data: {
          ...data,

          user: data.user
            ? {
                connect: data.user,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          expiresAt: true,
          id: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },

          verificationCode: true,
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
  @swagger.ApiOkResponse({ type: UserVerificationCode })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteUserVerificationCode(
    @common.Param() params: UserVerificationCodeWhereUniqueInput
  ): Promise<UserVerificationCode | null> {
    try {
      return await this.service.deleteUserVerificationCode({
        where: params,
        select: {
          createdAt: true,
          expiresAt: true,
          id: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },

          verificationCode: true,
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
