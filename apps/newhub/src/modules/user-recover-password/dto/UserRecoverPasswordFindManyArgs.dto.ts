import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserRecoverPasswordWhereInput } from "./UserRecoverPasswordWhereInput.dto";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { UserRecoverPasswordOrderByInput } from "./UserRecoverPasswordOrderByInput.dto";

@ArgsType()
class UserRecoverPasswordFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => UserRecoverPasswordWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => UserRecoverPasswordWhereInput, { nullable: true })
  @Type(() => UserRecoverPasswordWhereInput)
  where?: UserRecoverPasswordWhereInput;

  @ApiProperty({
    required: false,
    type: [UserRecoverPasswordOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [UserRecoverPasswordOrderByInput], { nullable: true })
  @Type(() => UserRecoverPasswordOrderByInput)
  orderBy?: Array<UserRecoverPasswordOrderByInput>;

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

export { UserRecoverPasswordFindManyArgs as UserRecoverPasswordFindManyArgs };
