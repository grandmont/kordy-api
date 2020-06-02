import ChatService from './ChatService';

// Interfaces
import {
    ServerInterface,
    ClientInterface,
    ResponseInterface,
    Action,
} from '../websocket';

interface ActionResponse {
    clients: Array<ClientInterface>;
    response: ResponseInterface;
}

// ActionService class
export default class ActionService {
    server: ServerInterface;
    client: ClientInterface;

    constructor(server: ServerInterface, client: ClientInterface) {
        this.server = server;
        this.client = client;
    }

    handleAction = async (action: Action, data: any): Promise<ActionResponse> =>
        await {
            'join-chat': this.handleJoinChat,
            'chat-message': this.handleChatMessage,
        }[action](data);

    handleChatMessage = async ({
        chatId,
        content,
    }): Promise<ActionResponse> => {
        try {
            const {
                connection: { user },
            } = this.client;

            const chat = await new ChatService().getChatById(chatId);

            if (!chat) {
                throw new Error(`No chat found with the id ${chatId}.`);
            }

            return responseHandler(this.server.rooms[chatId], 'chat-message', {
                user,
                content,
            });
        } catch (error) {
            return errorHandler([this.client], error);
        }
    };

    handleJoinChat = async ({ chatId }): Promise<ActionResponse> => {
        try {
            const chatService = new ChatService();
            const chat = await chatService.getChatById(chatId);

            if (!chat) {
                throw new Error(`No chat found with the id ${chatId}.`);
            }

            const rooms = this.server.rooms || {};

            Object.assign(rooms, {
                [chatId]: [...(rooms[chatId] || []), this.client],
            });

            this.server.rooms = rooms;

            this.client.connection = {
                ...this.client.connection,
                rooms: [...this.client.connection.rooms, chatId],
            };

            return responseHandler([this.client], 'join-chat');
        } catch (error) {
            return errorHandler([this.client], error);
        }
    };

    handleLeftChat = async (): Promise<ActionResponse> => {
        try {
            return responseHandler([this.client], 'left-chat');
        } catch (error) {
            return errorHandler([this.client], error);
        }
    };
}

const responseHandler = (
    clients: ClientInterface[],
    action: Action,
    data: any = null,
    error: any = null,
): { clients: ClientInterface[]; response: ResponseInterface } => ({
    clients,
    response: { status: true, action, data, error },
});

const errorHandler = (clients: ClientInterface[], error: any) =>
    responseHandler(clients, 'error', error);
