import { InputType, Field } from "@nestjs/graphql";
import { QlikWorkspaceWhereUniqueInput } from "../../qlik-workspace/dto";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput {
  @Field(() => [QlikWorkspaceWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [QlikWorkspaceWhereUniqueInput],
  })
  connect?: Array<QlikWorkspaceWhereUniqueInput>;
}

export { QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput as QlikWorkspaceCreateNestedManyWithoutQlikIntegrationsInput };
