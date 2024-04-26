import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from "class-validator";
import { QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput } from "./QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput.dto";
import { Type } from "class-transformer";

@InputType()
class QlikIntegrationUpdateInput {
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
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  domain?: string;

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
    type: () => QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput,
  })
  @ValidateNested()
  @Type(() => QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput)
  @IsOptional()
  @Field(() => QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput, {
    nullable: true,
  })
  qlikWorkspaces?: QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput;
}

export { QlikIntegrationUpdateInput as QlikIntegrationUpdateInput };
