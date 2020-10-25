import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware
{
    use ( _: Request, __: Response, next: NextFunction )
    {
        console.log( _, __ );
        console.log( `I ran`.red.bold );
        next();
    }
}