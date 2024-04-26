import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DateTimeFilter } from "../../../util/DateTimeFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { StringFilter } from "../../../util/StringFilter";
import { OrganizationWhereUniqueInput } from "../../organization/dto";
import { WorkspaceWhereUniqueInput } from "../../workspace/dto";

@InputType()
class OrganizationsWorkspaceWhereInput {
  @ApiProperty({
    required: false,
    type: DateTimeFilter,
  })
  @Type(() => DateTimeFilter)
  @IsOptional()
  @Field(() => DateTimeFilter, {
    nullable: true,
  })
  createdAt?: DateTimeFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: () => OrganizationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => OrganizationWhereUniqueInput)
  @IsOptional()
  @Field(() => OrganizationWhereUniqueInput, {
    nullable: true,
  })
  organization?: OrganizationWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: DateTimeFilter,
  })
  @Type(() => DateTimeFilter)
  @IsOptional()
  @Field(() => DateTimeFilter, {
    nullable: true,
  })
  updatedAt?: DateTimeFilter;

  @ApiProperty({
    required: false,
    type: () => WorkspaceWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WorkspaceWhereUniqueInput)
  @IsOptional()
  @Field(() => WorkspaceWhereUniqueInput, {
    nullable: true,
  })
  workspace?: WorkspaceWhereUniqueInput;
}

export { OrganizationsWorkspaceWhereInput as OrganizationsWorkspaceWhereInput };
