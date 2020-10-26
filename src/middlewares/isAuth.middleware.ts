import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class isAuthMiddleware implements NestMiddleware
{
    use ( req: Request, _: Response, next: NextFunction )
    {
        const currentUser: string = req.session.user;
        if ( !currentUser )
        {
            throw new HttpException( 'Not Authenticated', 401 );
        }
        next();
    }
}