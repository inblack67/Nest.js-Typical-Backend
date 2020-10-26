import { Field, ObjectType } from "@nestjs/graphql";
import { UserPopulatedWithPosts } from "src/populatedDto";

@ObjectType()
export class UserDto
{
    @Field()
    name: string;
    @Field()
    email: string;

    password: string;

    @Field( () => [ UserPopulatedWithPosts ], { nullable: true } )
    posts?: [ UserPopulatedWithPosts ];

    @Field()
    createdAt?: string;
    @Field()
    _id?: string;
}