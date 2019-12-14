import { InputType, Field } from 'type-graphql';

@InputType()
export default class CompensationInput {
  @Field()
  base: number;

  @Field()
  bonus: number;

  @Field()
  benefits: string;
}
