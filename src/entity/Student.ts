import { ObjectType, Field, ID, Int } from 'type-graphql';
import { ObjectIdColumn, ObjectID, Column } from 'typeorm';
import ClassStanding from './ClassStanding';

@ObjectType()
export default class Student {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  @Column()
  university: string;

  @Field(() => Int)
  @Column()
  numOfInternships: number;

  @Field(() => ClassStanding)
  @Column()
  classStanding: ClassStanding;
}
