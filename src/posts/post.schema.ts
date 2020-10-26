import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

export const PostSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: [ true, 'Title is required' ],
        unique: [ true, 'Title is already taken' ]
    },
    text: {
        type: String,
    },
    user: {
        type: ObjectID,
        ref: 'User',
        required: [ true, 'Who created this post?' ]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
} );