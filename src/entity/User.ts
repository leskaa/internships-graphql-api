import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field()
  @ObjectIdColumn()
  id: number;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;
}
