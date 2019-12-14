import 'reflect-metadata';
import { createConnection as CreateMongoConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import InternshipResolver from './resolvers/InternshipResolver';
import AuthResolver from './resolvers/AuthResolver';

(async () => {
  const app = express();

  // Setup Redis / Sessions
  const RedisStore = connectRedis(session);
  const redisClient = process.env.NODE_ENV === 'production'
    ? redis.createClient(process.env.REDISCLOUD_URL!, {no_ready_check: true})
    : redis.createClient();


  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: 'qid',
      secret: process.env.SESSION_SECRET || 'localdeveloper',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    }),
  );

  // Setup MongoDB Connection
  const dbOptions = await getConnectionOptions(process.env.NODE_ENV || 'development');
  Object.assign(dbOptions, { url: process.env.MONGODB_URI });
  await CreateMongoConnection({ ...dbOptions, name: 'default' });

  // Setup Apollo GraphQL Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, InternshipResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    playground: true,
    introspection: true,
  });
  apolloServer.applyMiddleware({ app, cors: true });

  // Start the server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.info(`🚀  Express server started on port ${port}!`);
  });
})();
