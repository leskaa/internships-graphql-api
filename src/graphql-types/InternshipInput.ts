import { InputType, Field, Int } from 'type-graphql';
import CompensationInput from './CompensationInput';
import StudentInput from './StudentInput';

@InputType()
export default class InternshipInput {
  @Field()
  title: string;

  @Field()
  company: string;

  @Field(() => CompensationInput)
  compensation: CompensationInput;

  @Field(() => StudentInput)
  student: StudentInput;

  @Field(() => Int)
  year: number;

  @Field(() => Int)
  durationInWeeks: number;
}
