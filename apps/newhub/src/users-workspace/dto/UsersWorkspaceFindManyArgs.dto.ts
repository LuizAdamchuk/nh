import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UsersWorkspaceWhereInput } from "./UsersWorkspaceWhereInput.dto";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { UsersWorkspaceOrderByInput } from "./UsersWorkspaceOrderByInput.dto";

@ArgsType()
class UsersWorkspaceFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => UsersWorkspaceWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => UsersWorkspaceWhereInput, { nullable: true })
  @Type(() => UsersWorkspaceWhereInput)
  where?: UsersWorkspaceWhereInput;

  @ApiProperty({
    required: false,
    type: [UsersWorkspaceOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [UsersWorkspaceOrderByInput], { nullable: true })
  @Type(() => UsersWorkspaceOrderByInput)
  orderBy?: Array<UsersWorkspaceOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { UsersWorkspaceFindManyArgs as UsersWorkspaceFindManyArgs };
