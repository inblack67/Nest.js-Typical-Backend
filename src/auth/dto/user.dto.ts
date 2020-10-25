import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto
{
    @Field()
    name: string;
    @Field()
    email: string;

    password: string;
    
    @Field()
    createdAt: string;
    @Field()
    _id: string;
}