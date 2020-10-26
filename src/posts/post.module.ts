import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostResolver } from './post.resolver';
import { PostSchema } from './post.schema';
import { PostService } from './post.service';

@Module( {
    imports: [ MongooseModule.forFeature( [ { name: 'Post', schema: PostSchema } ] ) ],
    providers: [ PostResolver, PostService ],
} )
export class PostModule
{

}
