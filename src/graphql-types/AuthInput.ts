import { InputType, Field } from 'type-graphql';

@InputType()
export default class AuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
