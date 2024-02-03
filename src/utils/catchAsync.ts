import { Handler, Request, Response, NextFunction } from "express";

export default (handler: Handler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise
        .resolve(handler(req, res, next))
        .catch(next);
};