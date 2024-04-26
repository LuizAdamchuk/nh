import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { QlikWorkspaceWhereInput } from "./QlikWorkspaceWhereInput.dto";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { QlikWorkspaceOrderByInput } from "./QlikWorkspaceOrderByInput.dto";

@ArgsType()
class QlikWorkspaceFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => QlikWorkspaceWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => QlikWorkspaceWhereInput, { nullable: true })
  @Type(() => QlikWorkspaceWhereInput)
  where?: QlikWorkspaceWhereInput;

  @ApiProperty({
    required: false,
    type: [QlikWorkspaceOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [QlikWorkspaceOrderByInput], { nullable: true })
  @Type(() => QlikWorkspaceOrderByInput)
  orderBy?: Array<QlikWorkspaceOrderByInput>;

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

export { QlikWorkspaceFindManyArgs as QlikWorkspaceFindManyArgs };
