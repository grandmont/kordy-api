// @ts-nocheck

import Chat from '../models/Chat';
import Message, { MessageInterface } from '../models/Message';

export default class MessageService {
    getMessagesByChatId = (chatId: string, offset: number): Promise<Chat> =>
        new Promise((resolve, reject) =>
            Chat.findByPk(chatId, {
                attributes: ['id'],
                include: [
                    {
                        offset,
                        limit: 10,
                        order: [['id', 'DESC']],
                        model: Message,
                        attributes: ['content', 'userId'],
                        as: 'messages',
                    },
                ],
            })
                .then((response: Chat) => resolve(response))
                .catch((error: any) => reject(error)),
        );

    sendMessage = (messageData: MessageInterface): Promise<Message> =>
        new Promise((resolve, reject) =>
            Message.create(messageData)
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );
}
