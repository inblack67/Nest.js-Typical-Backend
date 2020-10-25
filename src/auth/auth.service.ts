import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuth } from './auth.interface';

@Injectable()
export class AuthService
{
    constructor (
        @InjectModel( 'User' )
        private readonly userModel: Model<IAuth> )
    { }

    async users (): Promise<IAuth[]>
    {
        return [];
    }
}
