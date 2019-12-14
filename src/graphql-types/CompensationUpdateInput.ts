import { InputType, Float, Field } from 'type-graphql';

@InputType()
export default class CompensationUpdateInput {
  @Field(() => Float, { nullable: true })
  base?: number;

  @Field(() => Float, { nullable: true })
  bonus?: number;

  @Field(() => String, { nullable: true })
  benefits?: string;
}
