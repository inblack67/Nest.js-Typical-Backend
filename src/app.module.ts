import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostModule } from './posts/post.module';

@Module( {
  imports: [ ConfigModule.forRoot(), MongooseModule.forRoot( process.env.MONGO_URI ), GraphQLModule.forRoot( {
    autoSchemaFile: 'schema.gql',
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
