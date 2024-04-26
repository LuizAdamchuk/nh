import { InputType, Field } from "@nestjs/graphql";
import { QlikWorkspaceWhereUniqueInput } from "../../qlik-workspace/dto";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput {
  @Field(() => [QlikWorkspaceWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [QlikWorkspaceWhereUniqueInput],
  })
  connect?: Array<QlikWorkspaceWhereUniqueInput>;

  @Field(() => [QlikWorkspaceWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [QlikWorkspaceWhereUniqueInput],
  })
  disconnect?: Array<QlikWorkspaceWhereUniqueInput>;

  @Field(() => [QlikWorkspaceWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [QlikWorkspaceWhereUniqueInput],
  })
  set?: Array<QlikWorkspaceWhereUniqueInput>;
}

export { QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput as QlikWorkspaceUpdateManyWithoutQlikIntegrationsInput };
