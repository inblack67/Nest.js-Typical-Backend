import { Field, ObjectType } from "@nestjs/graphql";
import { PostPopulatedWithUser } from "src/populatedDto";

@ObjectType()
export class PostDto
{
    @Field()
    title: string;

    @Field( { nullable: true } )
    text?: string;

    @Field()
    user?: PostPopulatedWithUser;

    @Field()
    createdAt?: string;

    @Field()
    _id?: string;
}