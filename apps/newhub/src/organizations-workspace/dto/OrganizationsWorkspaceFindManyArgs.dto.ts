import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { OrganizationsWorkspaceWhereInput } from "./OrganizationsWorkspaceWhereInput.dto";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { OrganizationsWorkspaceOrderByInput } from "./OrganizationsWorkspaceOrderByInput.dto";

@ArgsType()
class OrganizationsWorkspaceFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => OrganizationsWorkspaceWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => OrganizationsWorkspaceWhereInput, { nullable: true })
  @Type(() => OrganizationsWorkspaceWhereInput)
  where?: OrganizationsWorkspaceWhereInput;

  @ApiProperty({
    required: false,
    type: [OrganizationsWorkspaceOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [OrganizationsWorkspaceOrderByInput], { nullable: true })
  @Type(() => OrganizationsWorkspaceOrderByInput)
  orderBy?: Array<OrganizationsWorkspaceOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { OrganizationsWorkspaceFindManyArgs as OrganizationsWorkspaceFindManyArgs };
