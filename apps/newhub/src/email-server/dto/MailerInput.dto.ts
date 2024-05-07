import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEmail } from "class-validator";

@InputType()
class MailerInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsEmail()
  @Field(() => String, {
    nullable: false,
  })
  email!: string;
}

export { MailerInput as MailerInput };
