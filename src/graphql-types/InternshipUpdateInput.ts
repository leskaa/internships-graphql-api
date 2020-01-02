import { InputType, Field, Int } from 'type-graphql';
import CompensationUpdateInput from './CompensationUpdateInput';
import StudentUpdateInput from './StudentUpdateInput';

@InputType()
export default class InternshipUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  location: string;

  @Field(() => CompensationUpdateInput, { nullable: true })
  compensation?: CompensationUpdateInput;

  @Field(() => StudentUpdateInput, { nullable: true })
  student?: StudentUpdateInput;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => Int, { nullable: true })
  durationInWeeks?: number;
}
