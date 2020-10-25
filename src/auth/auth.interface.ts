import { Document } from 'mongoose';

export interface IAuth extends Document
{
    name: string,
    email: string,
    password: string;
    createdAt: string;
    _id: string;
}