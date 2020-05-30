import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [, token] = req.headers['authorization'].split(' ');

        if (!token) {
            throw new Error('Not authorized');
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
            if (error || !response) {
                throw new Error('Invalid token');
            }

            req.body.user = response;
            next();
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
