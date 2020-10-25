import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'colors';

async function bootstrap ()
{
  const app = await NestFactory.create( AppModule );

  app.use( ( err, req, res, next ) =>
  {
    console.log( `OH NO`.blue.bold );
    next();
  } );

  const PORT = process.env.PORT || 5000;
  await app.listen( PORT );
  console.log( `Server started on port ${ PORT }`.green.bold );
}
bootstrap();
