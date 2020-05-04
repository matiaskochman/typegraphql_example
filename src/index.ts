import { ApolloServer } from 'apollo-server-express';
import Express from 'express'; //esModuleInterop flag in tsconfig
import { formatArgumentValidationError, AuthChecker } from 'type-graphql';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './Redis';
import cors from 'cors';
import { MyContext } from './types/MyContext';
import { createSchema } from './utils/createSchema';

export const customAuthChecker: AuthChecker<MyContext> = (
  {context},

  // { root, args, context, info },
  // roles,
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  // console.log(root);
  // console.log(args);
  // console.log(info);
  return !!context.req.session!.userId;
  // return true; // or false if access is denied
};

const main = async () => {

  await createConnection();
  const schema = await createSchema();
  
  const  apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError as any,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();
  const RedisStore = connectRedis(session);
  
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }));

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "cookie",
      secret: "matiaskoch12345",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );



  apolloServer.applyMiddleware({app});

  app.listen('4000', () => {
    console.log('server started on localhost:4000/graphql');
  });
}

main();