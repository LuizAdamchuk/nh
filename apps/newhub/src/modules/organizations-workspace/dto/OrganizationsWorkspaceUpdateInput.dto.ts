import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { OrganizationWhereUniqueInput } from "../../organization/dto";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { WorkspaceWhereUniqueInput } from "../../workspace/dto";

@InputType()
class OrganizationsWorkspaceUpdateInput {
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
  organization?: OrganizationWhereUniqueInput | null;

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
  workspace?: WorkspaceWhereUniqueInput | null;
}

export { OrganizationsWorkspaceUpdateInput as OrganizationsWorkspaceUpdateInput };
