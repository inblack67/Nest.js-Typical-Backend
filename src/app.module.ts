import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostModule } from './posts/post.module';
import { pubsub } from './utils/pubsub';

@Module( {
  imports: [ ConfigModule.forRoot(), MongooseModule.forRoot( process.env.MONGO_URI ), GraphQLModule.forRoot( {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true,
    },
    autoSchemaFile: 'schema.gql',
    installSubscriptionHandlers: true,
    context: ( { req, res } ) => ( { req, res, pubsub } ),
  } ), AuthModule, PostModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
} )
export class AppModule implements NestModule
{
  configure ( consumer: MiddlewareConsumer )
  {
    consumer.apply( LoggerMiddleware ).forRoutes( '*' );
  }
}
