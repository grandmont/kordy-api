import { Request, Response } from 'express';

import UserService from '../services/UserService';
import ChatService from '../services/ChatService';
import MessageService from '../services/MessageService';

const POST = {
    createChat: async (req: Request, res: Response) => {
        try {
            const { name, userId } = req.body;

            const chatService = new ChatService();

            const chat = await chatService.createChat({ name, userId });

            if (!chat) {
                throw new Error(`Error creating chat.`);
            }

            res.status(201).send(chat);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    joinChat: async (req: Request, res: Response) => {
        try {
            const { userId, chatId } = req.body;

            const userService = new UserService();
            const chatService = new ChatService();

            const user = await userService.getUserById(userId);
            const chat = await chatService.getChatById(chatId);

            if (!user) {
                throw new Error(`No user found with the id ${userId}.`);
            }

            if (!chat) {
                throw new Error(`No chat found with the id ${chatId}.`);
            }

            chatService
                .joinChat({ userId, chatId })
                .then((response) => res.status(200).send(response))
                .catch((_error) => {
                    throw new Error(`Error joining chat ${chatId}.`);
                });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    sendMessage: async (req: Request, res: Response) => {
        try {
            const { userId, chatId, content } = req.body;

            const chatService = new ChatService();
            const messageService = new MessageService();

            const chat = await chatService.getChatById(chatId);

            if (!chat) {
                throw new Error(`No chat found with the id ${chatId}.`);
            }

            messageService
                .sendMessage({ userId, chatId, content })
                .then((response) => res.status(201).send(response))
                .catch((_error) => {
                    throw new Error(`Error creating message.`);
                });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

const GET = {
    getChat: async (req: Request, res: Response) => {
        try {
            const { chatId } = req.params;

            const chatService = new ChatService();
            const chat = await chatService.getChatById(chatId);

            if (!chat) {
                throw new Error(`No chat found with the id ${chatId}.`);
            }

            res.status(200).send(chat);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    getChats: async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;

            const chatService = new ChatService();

            const chats = await chatService.getChats(userId);

            res.status(200).send(chats);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    getMessagesByChatId: async (req: Request, res: Response) => {
        try {
            const { chatId } = req.params;
            const { offset } = req.headers;

            const messageService = new MessageService();
            const messages = await messageService.getMessagesByChatId(
                chatId,
                parseInt(offset.toString()) || 0,
            );

            res.status(200).send(messages);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

export default { ...GET, ...POST };
