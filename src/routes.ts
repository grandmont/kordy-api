import { Router } from 'express';

import UserController from './controllers/UserController';

const router = Router();

router.get('/', (_req, res) => {
    res.json({ version: 'mamamiiiiiiiiiia' });
});

router.post('/createUser', UserController.createUser);

export default router;
