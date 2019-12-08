import { Query, Resolver, InputType, Field, Int, Mutation, Arg, Float } from 'type-graphql';
import { getMongoManager } from 'typeorm';
import Internship from '../entity/Internship';
import { ObjectID } from 'mongodb';

@InputType()
class CompensationInput {
  @Field()
  base: number;

  @Field()
  bonus: number;

  @Field()
  benefits: string;
}

@InputType()
class StudentInput {
  @Field()
  university: string;

  @Field(() => Int)
  numOfInternships: number;

  @Field()
  classStanding: string;
}

@InputType()
class InternshipInput {
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

@InputType()
class CompensationUpdateInput {
  @Field(() => Float, { nullable: true })
  base?: number;

  @Field(() => Float, { nullable: true })
  bonus?: number;

  @Field(() => String, { nullable: true })
  benefits?: string;
}

@InputType()
class StudentUpdateInput {
  @Field(() => String, { nullable: true })
  university?: string;

  @Field(() => Int, { nullable: true })
  numOfInternships?: number;

  @Field(() => String, { nullable: true })
  classStanding?: string;
}

@InputType()
class InternshipUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => CompensationUpdateInput, { nullable: true })
  compensation?: CompensationUpdateInput;

  @Field(() => StudentUpdateInput, { nullable: true })
  student?: StudentUpdateInput;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => Int, { nullable: true })
  durationInWeeks?: number;
}

@Resolver()
export default class InternshipResolver {
  @Mutation(() => Internship)
  async createInternship(@Arg('options', () => InternshipInput) options: InternshipInput) {
    const manager = getMongoManager();
    const internship = manager.create(Internship, options);
    const createdInternship = await manager.save(internship);
    return createdInternship;
  }

  @Mutation(() => Boolean)
  async updateInternship(
    @Arg('id') id: string,
    @Arg('input', () => InternshipUpdateInput) input: InternshipUpdateInput,
  ) {
    const manager = getMongoManager();
    const result = await manager.updateOne(Internship, {
      _id: new ObjectID(id)
    }, { $set: input });
    return result.modifiedCount === 1;
  }

  @Mutation(() => Boolean)
  async deleteInternship(@Arg('id') id: string) {
    const manager = getMongoManager();
    const result = await manager.deleteOne(Internship, {
      _id: new ObjectID(id)
    });
    return result.deletedCount === 1;
  }

  @Query(() => [Internship])
  async internships() {
    const manager = getMongoManager();
    const internships = await manager.find(Internship);
    return internships;
  }

  @Query(() => Internship)
  async internship(@Arg("id") id: string) {
    const manager = getMongoManager();
    const internship = await manager.findOne(Internship, id);
    return internship;
  }
}
