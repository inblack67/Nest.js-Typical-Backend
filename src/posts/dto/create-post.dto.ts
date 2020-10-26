import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreatePostDto
{
    @Field()
    title: string;

    @Field()
    text?: string;

    user: string;
}