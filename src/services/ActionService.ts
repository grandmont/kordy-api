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
    broadcast: Function;

    constructor(
        server: ServerInterface,
        client: ClientInterface,
        broadcast: Function,
    ) {
        this.server = server;
        this.client = client;
        this.broadcast = broadcast;
    }

    handleAction = async (
        action: Action,
        data = null,
    ): Promise<ActionResponse> =>
        await {
            'join-chat': this.handleJoinChat,
            'left-chat': this.handleLeftChat,
            'chat-message': this.handleChatMessage,
            disconnect: this.handleDisconnect,
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
            return errorHandler([this.client], { error: error.message });
        }
    };

    handleJoinChat = async ({ chatId }): Promise<ActionResponse> => {
        try {
            const {
                connection: {
                    user: { kordy },
                },
            } = this.client;

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

            return responseHandler(this.server.rooms[chatId], 'join-chat', {
                user: { kordy },
                room: chatId,
            });
        } catch (error) {
            return errorHandler([this.client], { error: error.message });
        }
    };

    handleLeftChat = async ({ chatId }): Promise<ActionResponse> => {
        try {
            const {
                connection: {
                    rooms,
                    user: { id: userId, kordy },
                },
            } = this.client;

            rooms.splice(
                rooms.findIndex((room) => room === chatId),
                1,
            );

            this.server.rooms[chatId].splice(
                this.server.rooms[chatId].findIndex(
                    ({ connection: { user } }) => userId === user.id,
                ),
                1,
            );

            return responseHandler(this.server.rooms[chatId], 'left-chat', {
                user: { kordy },
                room: chatId,
            });
        } catch (error) {
            return errorHandler([this.client], { error: error.message });
        }
    };

    handleDisconnect = async (): Promise<ActionResponse> => {
        try {
            const {
                connection: {
                    rooms,
                    user: { id: userId, kordy },
                },
            } = this.client;

            rooms.forEach((room) => {
                this.server.rooms[room].splice(
                    this.server.rooms[room].findIndex(
                        ({ connection: { user } }) => userId === user.id,
                    ),
                    1,
                );

                const { clients, response } = responseHandler(
                    this.server.rooms[room],
                    'disconnect',
                    { user: { kordy }, room },
                );

                this.broadcast(clients, response);
            });

            return errorHandler(
                [this.client],
                {
                    error: 'WebSocket connection closed.',
                },
                'disconnect',
            );
        } catch (error) {
            return errorHandler([this.client], { error: error.message });
        }
    };
}

const responseHandler = (
    clients: ClientInterface[],
    action: Action,
    data = null,
    error = null,
    status = true,
): { clients: ClientInterface[]; response: ResponseInterface } => ({
    clients,
    response: { status, action, data, error },
});

const errorHandler = (
    clients: ClientInterface[],
    error = null,
    action: Action = 'error',
) => responseHandler(clients, action, null, error, false);
