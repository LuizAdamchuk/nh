import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";

import { UserConfigService } from "./user-config.service";

import {
  UserConfig,
  UserConfigCreateInput,
  UserConfigFindManyArgs,
  UserConfigWhereUniqueInput,
  UserConfigUpdateInput,
} from "./dto";

@swagger.ApiTags("userConfig")
@swagger.ApiBearerAuth()
@common.Controller("userConfig")
export class UserConfigController {
  constructor(protected readonly service: UserConfigService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: UserConfig })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createUserConfig(
    @common.Body() data: UserConfigCreateInput
  ): Promise<UserConfig> {
    return await this.service.createUserConfig({
      data: {
        ...data,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        alias: true,
        createdAt: true,
        id: true,
        language: true,
        mode: true,
        picture: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [UserConfig] })
  @ApiNestedQuery(UserConfigFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async userConfigs(@common.Req() request: Request): Promise<UserConfig[]> {
    const args = plainToClass(UserConfigFindManyArgs, request.query);
    return this.service.userConfigs({
      ...args,
      select: {
        alias: true,
        createdAt: true,
        id: true,
        language: true,
        mode: true,
        picture: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: UserConfig })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async userConfig(
    @common.Param() params: UserConfigWhereUniqueInput
  ): Promise<UserConfig | null> {
    const result = await this.service.userConfig({
      where: params,
      select: {
        alias: true,
        createdAt: true,
        id: true,
        language: true,
        mode: true,
        picture: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
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
  @swagger.ApiOkResponse({ type: UserConfig })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateUserConfig(
    @common.Param() params: UserConfigWhereUniqueInput,
    @common.Body() data: UserConfigUpdateInput
  ): Promise<UserConfig | null> {
    try {
      return await this.service.updateUserConfig({
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
          alias: true,
          createdAt: true,
          id: true,
          language: true,
          mode: true,
          picture: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
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
  @swagger.ApiOkResponse({ type: UserConfig })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteUserConfig(
    @common.Param() params: UserConfigWhereUniqueInput
  ): Promise<UserConfig | null> {
    try {
      return await this.service.deleteUserConfig({
        where: params,
        select: {
          alias: true,
          createdAt: true,
          id: true,
          language: true,
          mode: true,
          picture: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
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
