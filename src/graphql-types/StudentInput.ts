import { InputType, Field, Int } from 'type-graphql';
import ClassStanding from './ClassStanding';

@InputType()
export default class StudentInput {
  @Field()
  university: string;

  @Field(() => Int)
  numOfInternships: number;

  @Field(() => ClassStanding)
  classStanding: ClassStanding;
}
