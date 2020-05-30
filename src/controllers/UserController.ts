import { Request, Response } from 'express';

import UserService from '../services/UserService';

const GET = {};

const POST = {
    createUser: (req: Request, res: Response) => {
        try {
            const { kordy, email, password, name } = req.body;

            const userService = new UserService();

            userService
                .createUser({ kordy, email, password, name })
                .then((user) => res.status(201).send(user))
                .catch((error) => res.status(500).send(error));
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default { ...GET, ...POST };
