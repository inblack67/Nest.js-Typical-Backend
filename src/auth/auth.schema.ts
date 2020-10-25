import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: [ true, 'Email is already taken' ]
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
} );