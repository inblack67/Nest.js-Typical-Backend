import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginDto
{
    @Field()
    email: string;
    @Field()
    password: string;
}