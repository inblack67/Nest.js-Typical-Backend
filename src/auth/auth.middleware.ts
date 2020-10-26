import { HttpException } from "@nestjs/common";
import { MyContext } from "src/utils/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ( { context }, next ) =>
{
    const currentUser = context.req.session.user;

    if ( !currentUser )
    {
        throw new HttpException( 'YEAH BITCH!', 401 );
    }
    return next();
};
