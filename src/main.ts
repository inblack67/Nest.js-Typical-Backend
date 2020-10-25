import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import morgan from 'morgan';
import 'colors';
import { __prod__ } from './utils/constants';

async function bootstrap ()
{
  const RedisClient = new Redis();
  const RedisStore = connectRedis( session );

  const app = await NestFactory.create( AppModule );

  app.enableCors();

  app.use( morgan( 'dev' ) );

  app.use(
    session( {
      store: new RedisStore( { client: RedisClient } ),
      name: 'quid',
      secret: process.env.SESSION_SECRET,
      resave: false, // no revival
      saveUninitialized: false, // dont save until the cookie is generated
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    } ),
  );

  const PORT = process.env.PORT || 5000;
  await app.listen( PORT );
  console.log( `Server started on port ${ PORT }`.green.bold );
}
bootstrap();
