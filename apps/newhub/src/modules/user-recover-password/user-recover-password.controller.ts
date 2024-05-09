import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";

import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { UserRecoverPasswordService } from "./user-recover-password.service";
import {
  UserRecoverPasswordCreateInput,
  UserRecoverPassword,
  UserRecoverPasswordFindManyArgs,
  UserRecoverPasswordWhereUniqueInput,
  UserRecoverPasswordUpdateInput,
} from "./dto";

@swagger.ApiTags("userRecoverPassword")
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard)
@common.Controller("userRecoverPassword")
export class UserRecoverPasswordController {
  constructor(protected readonly service: UserRecoverPasswordService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: UserRecoverPassword })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createUserRecoverPassword(
    @common.Body() data: UserRecoverPasswordCreateInput
  ): Promise<UserRecoverPassword> {
    return await this.service.createUserRecoverPassword({
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

        token: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [UserRecoverPassword] })
  @ApiNestedQuery(UserRecoverPasswordFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async userRecoverPasswords(
    @common.Req() request: Request
  ): Promise<UserRecoverPassword[]> {
    const args = plainToClass(UserRecoverPasswordFindManyArgs, request.query);
    return this.service.userRecoverPasswords({
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

        token: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: UserRecoverPassword })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async userRecoverPassword(
    @common.Param() params: UserRecoverPasswordWhereUniqueInput
  ): Promise<UserRecoverPassword | null> {
    const result = await this.service.userRecoverPassword({
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

        token: true,
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
  @swagger.ApiOkResponse({ type: UserRecoverPassword })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateUserRecoverPassword(
    @common.Param() params: UserRecoverPasswordWhereUniqueInput,
    @common.Body() data: UserRecoverPasswordUpdateInput
  ): Promise<UserRecoverPassword | null> {
    try {
      return await this.service.updateUserRecoverPassword({
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

          token: true,
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
  @swagger.ApiOkResponse({ type: UserRecoverPassword })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteUserRecoverPassword(
    @common.Param() params: UserRecoverPasswordWhereUniqueInput
  ): Promise<UserRecoverPassword | null> {
    try {
      return await this.service.deleteUserRecoverPassword({
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

          token: true,
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
