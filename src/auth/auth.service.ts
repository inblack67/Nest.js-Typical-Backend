import { Injectable } from '@nestjs/common';
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
        return this.userModel.find();
    }

    async register (
        data: RegisterDto
    ): Promise<UserDto>
    {
        return this.userModel.create( data );
    }

    async delete (
        id: string
    ): Promise<UserDto>
    {
        return this.userModel.findByIdAndDelete( id );
    }
}
