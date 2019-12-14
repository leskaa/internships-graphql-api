/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import MyContext from '../graphql-types/MyContext';

const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new AuthenticationError('not authenticated');
  }

  return next();
};

export default isAuth;
