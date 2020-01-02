import { Entity, ObjectIdColumn, Column, CreateDateColumn, ObjectID } from 'typeorm';
import { ObjectType, Field, Int, ID } from 'type-graphql';
import Compensation from './Compensation';
import Student from './Student';

@ObjectType()
@Entity()
export default class UnverifiedInternship {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  company: string;

  @Field()
  @Column()
  location: string;

  @Field(() => Compensation)
  @Column()
  compensation: Compensation;

  @Field(() => Student)
  @Column()
  student: Student;

  @Field(() => Int)
  @Column()
  year: number;

  @Field(() => Int)
  @Column()
  durationInWeeks: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
