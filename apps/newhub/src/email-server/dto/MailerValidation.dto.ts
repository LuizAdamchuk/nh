import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEmail } from "class-validator";

@InputType()
class MailerValidation {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Field(() => String, {
    nullable: false,
  })
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @Field(() => String, {
    nullable: false,
  })
  code!: string;
}

export { MailerValidation as MailerValidation };
