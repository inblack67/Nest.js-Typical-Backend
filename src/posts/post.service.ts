import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { IPost } from './post.interface';

@Injectable()
export class PostService
{
    constructor (
        @InjectModel( 'Post' )
        private readonly postModel: Model<IPost> )
    { }

    async posts (): Promise<PostDto[]>
    {
        return await this.postModel.find().populate( 'user' );
    }

    async findById (
        id: string
    ): Promise<PostDto>
    {
        const post = await this.postModel.findById( id );
        if ( !post )
        {
            throw new HttpException( 'Post does not exists', 401 );
        }
        return post;
    }


    async createPost (
        data: CreatePostDto
    ): Promise<PostDto>
    {
        try
        {
            const createdPost = await this.postModel.create( data );
            const newPost = await this.postModel.findById( createdPost._id ).populate( 'user' );
            return newPost;
        } catch ( err )
        {
            if ( err.code === 11000 )
            {

                throw new HttpException( 'Title is already taken', 401 );
            }
            throw new HttpException( err, 400 );
        }
    }

    async delete (
        id: string
    ): Promise<PostDto>
    {
        return await this.postModel.findByIdAndDelete( id );
    }
}
