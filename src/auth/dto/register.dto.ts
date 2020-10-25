import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegisterDto
{
    @Field()
    name: string;
    @Field()
    email: string;
    password: string;
}