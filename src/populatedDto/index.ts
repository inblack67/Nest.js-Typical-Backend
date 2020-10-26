import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostPopulatedWithUser
{
    @Field()
    email: string;
    @Field()
    name: string;
    @Field()
    _id: string;
    @Field()
    createdAt: string;
}

@ObjectType()
export class UserPopulatedWithPosts
{
    @Field( { nullable: true } )
    title: string;
    @Field( { nullable: true } )
    text?: string;
    @Field( { nullable: true } )
    _id: string;
    @Field()
    createdAt: string;
}