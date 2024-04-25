import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { QlikIntegrationWhereInput } from "./QlikIntegrationWhereInput.dto";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { QlikIntegrationOrderByInput } from "./QlikIntegrationOrderByInput.dto";

@ArgsType()
class QlikIntegrationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => QlikIntegrationWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => QlikIntegrationWhereInput, { nullable: true })
  @Type(() => QlikIntegrationWhereInput)
  where?: QlikIntegrationWhereInput;

  @ApiProperty({
    required: false,
    type: [QlikIntegrationOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [QlikIntegrationOrderByInput], { nullable: true })
  @Type(() => QlikIntegrationOrderByInput)
  orderBy?: Array<QlikIntegrationOrderByInput>;

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

export { QlikIntegrationFindManyArgs as QlikIntegrationFindManyArgs };
