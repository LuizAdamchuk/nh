import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

@InputType()
class UserResetPasswordParams {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsEmail()
  @Field(() => String, {
    nullable: false,
  })
  email!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, {
    nullable: false,
  })
  token!: string;
}

export { UserResetPasswordParams as UserResetPasswordParams };
