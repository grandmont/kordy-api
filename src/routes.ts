import { Router } from 'express';

//Controllers
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import ChatController from './controllers/ChatController';

// Middlewares
import isAuth from './middlewares/isAuth';

const router = Router();

// User
router.get('/refreshToken', isAuth, UserController.refreshToken);
router.post('/createUser', UserController.createUser);
router.post('/auth', UserController.auth);

// Post
router.get('/getPostById/:postId', isAuth, PostController.getPostById);
router.get('/getPosts', isAuth, PostController.getPosts);
router.post('/createPost', isAuth, PostController.createPost);

// Chat
router.get('/chat/:chatId', isAuth, ChatController.getChat);
router.get('/chats', isAuth, ChatController.getChats);
router.post('/createChat', isAuth, ChatController.createChat);
router.post('/joinChat', isAuth, ChatController.joinChat);

// Message
router.get('/messages/:chatId', isAuth, ChatController.getMessagesByChatId);
router.post('/sendMessage', isAuth, ChatController.sendMessage);

export default router;
