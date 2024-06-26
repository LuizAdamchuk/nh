import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { WorkspaceWhereInput } from "./WorkspaceWhereInput.dto";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { WorkspaceOrderByInput } from "./WorkspaceOrderByInput.dto";

@ArgsType()
class WorkspaceFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => WorkspaceWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => WorkspaceWhereInput, { nullable: true })
  @Type(() => WorkspaceWhereInput)
  where?: WorkspaceWhereInput;

  @ApiProperty({
    required: false,
    type: [WorkspaceOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [WorkspaceOrderByInput], { nullable: true })
  @Type(() => WorkspaceOrderByInput)
  orderBy?: Array<WorkspaceOrderByInput>;

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

export { WorkspaceFindManyArgs as WorkspaceFindManyArgs };
