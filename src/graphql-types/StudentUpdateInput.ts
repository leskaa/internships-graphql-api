import { InputType, Field, Int } from 'type-graphql';
import ClassStanding from './ClassStanding';

@InputType()
export default class StudentUpdateInput {
  @Field(() => String, { nullable: true })
  university?: string;

  @Field(() => Int, { nullable: true })
  numOfInternships?: number;

  @Field(() => ClassStanding, { nullable: true })
  classStanding?: ClassStanding;
}
