import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuth } from './auth.interface';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService
{
    constructor (
        @InjectModel( 'User' )
        private readonly userModel: Model<IAuth> )
    { }

    async users (): Promise<IAuth[]>
    {
        return await this.userModel.find();
    }

    async findById (
        id: string
    )
    {
        const user = await this.userModel.findById( id );
        if ( !user )
        {
            throw new HttpException( 'Invalid Credentials', 401 );
        }
        return user;
    }

    async findByEmail (
        email: string
    )
    {
        const user = await this.userModel.findOne( { email } );
        if ( !user )
        {
            throw new HttpException( 'Invalid Credentials', 401 );
        }
        return user;
    }

    async register (
        data: RegisterDto
    ): Promise<UserDto>
    {
        try
        {
            return await this.userModel.create( data );
        } catch ( err )
        {
            if ( err.code === 11000 )
            {

                throw new HttpException( 'Email is already taken', 401 );
            }
            throw new HttpException( err, 400 );
        }
    }

    async delete (
        id: string
    ): Promise<UserDto>
    {
        return await this.userModel.findByIdAndDelete( id );
    }
}
