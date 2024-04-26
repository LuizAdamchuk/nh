import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from "class-validator";
import { QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput } from "./QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput.dto";
import { Type } from "class-transformer";

@InputType()
class QlikIntegrationCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  alias?: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  domain!: string;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  issuer?: boolean | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  keyId?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  qlikId?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  qlikTheme?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  qlikWebIntegrationId?: string | null;

  @ApiProperty({
    required: false,
    type: () => QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput,
  })
  @ValidateNested()
  @Type(() => QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput)
  @IsOptional()
  @Field(() => QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput, {
    nullable: true,
  })
  qlikWorkspaces?: QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput;
}

export { QlikIntegrationCreateInput as QlikIntegrationCreateInput };
