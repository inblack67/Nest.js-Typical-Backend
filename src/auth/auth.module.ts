import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthResolver } from './auth.resolver';
import { AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';

@Module( {
    imports: [ MongooseModule.forFeature( [ { name: 'User', schema: AuthSchema } ] ) ],
    providers: [ AuthResolver, AuthService ],
} )
export class AuthModule
{

}
