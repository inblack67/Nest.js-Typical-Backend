import { HttpException } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { MyContext } from "src/utils/types";
import { PostService } from "./post.service";
import { PostDto } from "./dto/post.dto";

@Resolver('post')
export class PostResolver
{
    constructor ( private readonly postService: PostService ) { }

    @Query( () => String )
    hello (): string
    {
        return 'nest';
    }

    @Query( () => [ PostDto ] )
    async posts (
    ): Promise<PostDto[]>
    {
        return this.postService.posts();
    }

    @Mutation( () => PostDto )
    async createPost (
        @Args( 'title' ) title: string,
        @Args( 'text', { nullable: true } ) text: string,
        @Context() { req }: MyContext
    ): Promise<PostDto>
    {
        const currentUser: string = req.session.user;
        if ( !currentUser )
        {
            throw new HttpException( 'Not Authenticated', 401 );
        }

        const newPost = await this.postService.createPost( { title, text, user: currentUser } );

        return newPost;
    }


    @Mutation( () => PostDto )
    async deletePost (
        @Args( 'id' ) id: string,
        @Context() { req }: MyContext
    ): Promise<PostDto>
    {
        const currentUser = req.session.user;
        if ( !currentUser )
        {
            throw new HttpException( 'Not Authenticated', 401 );
            throw new HttpException( 'Not Authenticated', 401 );
        }
        const post = await this.postService.findById( id );

        if ( post.user.toString() !== currentUser )
        {
            throw new HttpException( 'Not Authorized', 401 );

        }
        return this.postService.delete( id );
    }
}