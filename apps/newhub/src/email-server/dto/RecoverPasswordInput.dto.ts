import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

@InputType()
class RecoverPasswordInput {
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

export { RecoverPasswordInput as RecoverPasswordInput };
