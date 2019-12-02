import { Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class Compensation {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  @Column()
  base: number;

  @Field()
  @Column()
  bonus: number;

  @Field()
  @Column()
  benefits: string;
}
