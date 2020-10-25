import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegisterDto
{
    @Field()
    name: string;
    @Field()
    email: string;
    // dont select
    password: string;
}