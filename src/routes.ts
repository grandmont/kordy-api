import { Router } from 'express';

//Controllers
import UserController from './controllers/UserController';
import ChatController from './controllers/ChatController';

const router = Router();

router.get('/', (_req, res) => {
    res.json({ version: 'mamamiiiiiiiiiia' });
});

// User
router.post('/createUser', UserController.createUser);

// Chat
router.get('/getChat/:chatId', ChatController.getChat);
router.get('/getChats', ChatController.getChats);
router.post('/createChat', ChatController.createChat);
router.post('/joinChat', ChatController.joinChat);

// Message
router.get('/getMessagesByChatId/:chatId', ChatController.getMessagesByChatId);
router.post('/sendMessage', ChatController.sendMessage);

export default router;
