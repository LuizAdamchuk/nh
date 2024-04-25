import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserVerificationCodeWhereInput } from "./UserVerificationCodeWhereInput.dto";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { UserVerificationCodeOrderByInput } from "./UserVerificationCodeOrderByInput.dto";

@ArgsType()
class UserVerificationCodeFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => UserVerificationCodeWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => UserVerificationCodeWhereInput, { nullable: true })
  @Type(() => UserVerificationCodeWhereInput)
  where?: UserVerificationCodeWhereInput;

  @ApiProperty({
    required: false,
    type: [UserVerificationCodeOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [UserVerificationCodeOrderByInput], { nullable: true })
  @Type(() => UserVerificationCodeOrderByInput)
  orderBy?: Array<UserVerificationCodeOrderByInput>;

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

export { UserVerificationCodeFindManyArgs as UserVerificationCodeFindManyArgs };
