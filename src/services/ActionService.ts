import ChatService from './ChatService';

// Interfaces
import { ServerInterface, ClientInterface } from '../websocket';

interface Action {
    action: 'join-chat' | 'chat-message';
    data: {
        chatId: any;
        content: any;
    };
}

interface ActionConstructor {
    server: ServerInterface;
    client: ClientInterface;
}

interface ActionResponse {
    clients: Array<ClientInterface>;
    response: object;
}

// ActionService class
export default class ActionService {
    server: ServerInterface;
    client: ClientInterface;

    constructor({ server, client }: ActionConstructor) {
        this.server = server;
        this.client = client;
    }

    handleAction = async ({ action, data }: Action): Promise<ActionResponse> =>
        await {
            'join-chat': this.handleJoinChat,
            'chat-message': this.handleChatMessage,
        }[action](data);

    handleChatMessage = async ({
        chatId,
        content,
    }): Promise<ActionResponse> => {
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
            return error;
        }
    };

    handleJoinChat = async ({ chatId }): Promise<ActionResponse> => {
        try {
            const chatService = new ChatService();
            const chat = await chatService.getChatById(chatId);

            if (!chat) {
                throw new Error(`No chat found with the id ${chatId}.`);
            }

            const openChats = this.server.openChats || {};

            Object.assign(openChats, {
                [chatId]: [...(openChats[chatId] || []), this.client],
            });

            this.server.openChats = openChats;

            console.log(this.server.openChats);

            return {
                clients: [this.client],
                response: { action: 'join-chat', status: true },
            };
        } catch (error) {
            console.error(error);
            return error;
        }
    };
}
