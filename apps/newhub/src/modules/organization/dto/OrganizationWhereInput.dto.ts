import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringNullableFilter } from "../../../util/StringNullableFilter";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { StringFilter } from "../../../util/StringFilter";

@InputType()
class OrganizationWhereInput {
  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  name!: StringFilter;
}

export { OrganizationWhereInput as OrganizationWhereInput };
