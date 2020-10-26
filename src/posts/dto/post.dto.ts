import { Field, ObjectType } from "@nestjs/graphql";
import { UserDto } from "src/auth/dto/user.dto";

@ObjectType()
export class PostDto
{
    @Field()
    title: string;

    @Field( { nullable: true } )
    text?: string;

    @Field()
    user?: UserDto;

    @Field()
    createdAt?: string;

    @Field()
    _id?: string;
}