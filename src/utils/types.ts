import { Request, Response } from 'express';
import { PubSub } from 'graphql-subscriptions';

export type MyContext = {
    req: Request;
    res: Response;
    pubsub: PubSub;
};