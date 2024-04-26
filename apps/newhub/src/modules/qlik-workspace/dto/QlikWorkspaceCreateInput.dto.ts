import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { QlikIntegrationWhereUniqueInput } from "../../qlik-integration/dto";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { WorkspaceWhereUniqueInput } from "../../workspace/dto";

@InputType()
class QlikWorkspaceCreateInput {
  @ApiProperty({
    required: false,
    type: () => QlikIntegrationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => QlikIntegrationWhereUniqueInput)
  @IsOptional()
  @Field(() => QlikIntegrationWhereUniqueInput, {
    nullable: true,
  })
  qlikintegration?: QlikIntegrationWhereUniqueInput | null;

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

export { QlikWorkspaceCreateInput as QlikWorkspaceCreateInput };
