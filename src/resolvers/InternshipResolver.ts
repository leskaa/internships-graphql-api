/* eslint-disable no-param-reassign */
import { Query, Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { getMongoManager } from 'typeorm';
import { ObjectID } from 'mongodb';
import UnverifiedInternship from '../entity/UnverifiedInternship';
import isAuth from '../middleware/isAuth';
import InternshipUpdateInput from '../graphql-types/InternshipUpdateInput';
import Internship from '../entity/Internship';
import InternshipInput from '../graphql-types/InternshipInput';

@Resolver()
export default class InternshipResolver {
  @Mutation(() => Internship)
  // @UseMiddleware(isAuth)
  async createInternship(@Arg('options', () => InternshipInput) options: InternshipInput) {
    const manager = getMongoManager();
    const internship = manager.create(Internship, options);
    const createdInternship = await manager.save(internship);
    return createdInternship;
  }

  @Mutation(() => UnverifiedInternship)
  async createUnverifiedInternship(
    @Arg('options', () => InternshipInput) options: InternshipInput,
  ) {
    const manager = getMongoManager();
    const unverifiedInternship = manager.create(UnverifiedInternship, options);
    const createdInternship = await manager.save(unverifiedInternship);
    return createdInternship;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateInternship(
    @Arg('id') id: string,
    @Arg('input', () => InternshipUpdateInput) input: InternshipUpdateInput,
  ) {
    const manager = getMongoManager();
    const internship = await manager.findOne(Internship, id);
    if (internship) {
      if (input.compensation) {
        if (!input.compensation.base && internship.compensation.base) {
          input.compensation.base = internship.compensation.base;
        }
        if (!input.compensation.bonus && internship.compensation.bonus) {
          input.compensation.bonus = internship.compensation.bonus;
        }
        if (!input.compensation.benefits && internship.compensation.benefits) {
          input.compensation.benefits = internship.compensation.benefits;
        }
      }
      if (input.student) {
        if (!input.student.classStanding && internship.student.classStanding) {
          input.student.classStanding = internship.student.classStanding;
        }
        if (!input.student.numOfInternships && internship.student.numOfInternships) {
          input.student.numOfInternships = internship.student.numOfInternships;
        }
        if (!input.student.university && internship.student.university) {
          input.student.university = internship.student.university;
        }
      }
    }
    const result = await manager.updateOne(
      Internship,
      {
        _id: new ObjectID(id),
      },
      { $set: input },
    );
    return result.modifiedCount === 1;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteInternship(@Arg('id') id: string) {
    const manager = getMongoManager();
    const result = await manager.deleteOne(Internship, {
      _id: new ObjectID(id),
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
  async internship(@Arg('id') id: string) {
    const manager = getMongoManager();
    const internship = await manager.findOne(Internship, id);
    return internship;
  }
}
