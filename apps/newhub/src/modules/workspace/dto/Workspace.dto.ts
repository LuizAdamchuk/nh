import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { OrganizationsWorkspace } from "../../organizations-workspace/dto";
import { QlikWorkspace } from "../../qlik-workspace/dto";
import { UsersWorkspace } from "../../users-workspace/dto";

@ObjectType()
class Workspace {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: false,
    type: () => [OrganizationsWorkspace],
  })
  @ValidateNested()
  @Type(() => OrganizationsWorkspace)
  @IsOptional()
  organizationsWorkspaces?: Array<OrganizationsWorkspace>;

  @ApiProperty({
    required: false,
    type: () => [QlikWorkspace],
  })
  @ValidateNested()
  @Type(() => QlikWorkspace)
  @IsOptional()
  qlikWorkspaces?: Array<QlikWorkspace>;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  slug!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: false,
    type: () => [UsersWorkspace],
  })
  @ValidateNested()
  @Type(() => UsersWorkspace)
  @IsOptional()
  usersWorkspaces?: Array<UsersWorkspace>;
}

export { Workspace as Workspace };
