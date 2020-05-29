import User from '../models/User';
import Chat from '../models/Chat';

export default class ChatService {
    getChatById = (chatId: string): Promise<object> =>
        new Promise((resolve, reject) =>
            Chat.findByPk(chatId)
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );

    getChats = (userId: string) =>
        new Promise((resolve, reject) => {
            Chat.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'kordy'],
                        as: 'users',
                        through: { attributes: [] },
                    },
                ],
            })
                .then((response) => {
                    response.forEach((chat) => {
                        if (chat.users.some((user) => user.id === userId)) {
                            Object.assign(chat, { participates: true });
                        }
                    });
                    return resolve(response);
                })
                .catch((error) => reject(error));
        });

    createChat = ({ name = null, userId }) =>
        new Promise((resolve, reject) => {
            Chat.create({ name })
                .then((chat) => {
                    chat.setUsers(userId);
                    return resolve(chat);
                })
                .catch((error) => reject(error));
        });

    joinChat = ({ userId, chatId }): Promise<object> =>
        new Promise(async (resolve, reject) => {
            Chat.findOne({
                where: { id: chatId },
                attributes: ['id', 'name'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'kordy'],
                        as: 'users',
                        through: { attributes: [] },
                    },
                ],
            })
                .then((chat) => {
                    chat.addUser(userId);
                    return resolve(chat);
                })
                .catch((error) => reject(error));
        });
}
