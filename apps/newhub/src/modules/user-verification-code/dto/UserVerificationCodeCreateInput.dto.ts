import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../../user/dto/UserWhereUniqueInput";

@InputType()
class UserVerificationCodeCreateInput {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  expiresAt!: Date;

  @ApiProperty({
    required: false,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  user?: UserWhereUniqueInput | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  verificationCode!: string;
}

export { UserVerificationCodeCreateInput as UserVerificationCodeCreateInput };
