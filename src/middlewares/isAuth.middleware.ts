import { MyContext } from "../utils/types";
import { MiddlewareFn } from "type-graphql";
import { HttpException } from "@nestjs/common";

export const isAuth: MiddlewareFn<MyContext> = ( { context }, next ) =>
{
    const currentUser = context.req.session.user;

    if ( !currentUser )
    {
        throw new HttpException( 'Not Authenticated', 401 );
    }
    return next();
};