import { Server } from 'ws';
import ChatService from './ChatService';
import MessageService from './MessageService';

interface ActionConstructor {
    server: Server;
    client: WebSocket;
}

export default class ActionService {
    server: Server;
    client: WebSocket;

    constructor({ server, client }: ActionConstructor) {
        this.server = server;
        this.client = client;
    }

    handleAction = ({ action, data }) =>
        new Promise((resolve, _reject) => {
            let response = {};
            switch (action) {
                case 'join-chat':
                    response = this.handleJoinChat(data);
                    break;
                case 'chat-message':
                    response = this.handleChatMessage(data);
                    break;
                default:
                    break;
            }
            return resolve(response);
        });

    handleChatMessage = async ({ chatId, content }) => {
        try {
            const { user } = this.client;

            const chat = await new ChatService().getChatById(chatId);

            if (!chat) {
                throw new Error(`No chat found with the id ${chatId}.`);
            }

            return {
                clients: this.server.openChats[chatId],
                response: { action: 'chat-message', user, content },
            };
        } catch (error) {
            console.error(error);
        }
    };

    handleJoinChat = async ({ chatId }) => {
        try {
            const chatService = new ChatService();
            const chat = await chatService.getChatById(chatId);

            if (!chat) {
                throw new Error(`No chat found with the id ${chatId}.`);
            }

            if (this.server.openChats) {
                if (this.server.openChats[chatId]) {
                    this.server.openChats[chatId].push(this.client);
                } else {
                    this.server.openChats[chatId] = [this.client];
                }
            } else {
                this.server.openChats = { [chatId]: [this.client] };
            }

            return {
                clients: [this.client],
                response: { action: 'join-chat', status: true },
            };
        } catch (error) {
            console.error(error);
        }
    };
}
