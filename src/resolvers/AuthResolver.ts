/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcryptjs';
import { Resolver, Mutation, Arg, Ctx, Query, UseMiddleware } from 'type-graphql';
import UserResponse from '../graphql-types/UserResponse';
import AuthInput from '../graphql-types/AuthInput';
import User from '../entity/User';
import isAuth from '../middleware/isAuth';
import MyContext from '../graphql-types/MyContext';

const invalidLoginResponse = {
  errors: [
    {
      path: 'email',
      message: 'invalid login',
    },
  ],
};

@Resolver()
export default class AuthResolver {
  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async register(
    @Arg('input')
    { email, password }: AuthInput,
  ): Promise<UserResponse> {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        errors: [
          {
            path: 'email',
            message: 'already in use',
          },
        ],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
    }).save();

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput,
    @Ctx() ctx: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return invalidLoginResponse;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return invalidLoginResponse;
    }

    ctx.req.session!.userId = user.id;

    return { user };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return User.findOne(ctx.req.session!.userId);
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((res, rej) => {
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(err);
        }

        ctx.res.clearCookie('qid');
        return res(true);
      });
    });
  }
}
