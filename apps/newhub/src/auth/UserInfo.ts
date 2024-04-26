import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../modules/user/base/User";

@ObjectType()
export class UserInfo implements Partial<User> {
  @Field(() => String)
  id!: string;
  @Field(() => String)
  username!: string;
  @Field(() => [String])
  roles!: string[];
  @Field(() => String, { nullable: true })
  accessToken?: string;
}
