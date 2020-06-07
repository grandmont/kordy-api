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

        this.server.rooms.addEventListener(this.handleJoinWaitingListChanges);
    }

    handleAction = async (
        action: Action,
        data = null,
    ): Promise<ActionResponse> =>
        await {
            'join-waiting-list': this.handleJoinWaitingList,
            'join-chat': this.handleJoinChat,
            'left-chat': this.handleLeftChat,
            'chat-message': this.handleChatMessage,
            disconnect: this.handleDisconnect,
        }[action](data);

    handleJoinWaitingList = async () => {
        try {
            Object.assign(this.server.rooms, {
                waiting: [...this.server.rooms['waiting'], this.client],
            });

            return responseHandler([this.client], 'join-waiting-list');
        } catch (error) {
            return errorHandler([this.client], { error: error.message });
        }
    };

    handleJoinWaitingListChanges = (waiting: ClientInterface[]) => {
        if (waiting.length > 1) {
            // Gets the first and second clients from the waiting list
            const [first, second] = this.server.rooms.waiting;

            // Removes the first and second clients from the waiting list
            this.server.rooms.waiting.splice(0, 2);

            // Since the kordy is unique, we don't have to worry about their positions
            const room = `${first.connection.user.kordy}-${second.connection.user.kordy}`;

            // Creates the room with the clients
            this.server.rooms[room] = [first, second];

            // Send a join-chat response to the clients
            const { clients, response } = responseHandler(
                [first, second],
                'join-chat',
                { room },
            );

            this.broadcast(clients, response);
        }
    };

    handleChatMessage = async ({ room, content }): Promise<ActionResponse> => {
        try {
            return responseHandler(this.server.rooms[room], 'chat-message', {
                user: this.client.connection.user,
                content,
            });
        } catch (error) {
            return errorHandler([this.client], { error: error.message });
        }
    };

    handleJoinChat = async ({ room }): Promise<ActionResponse> => {
        try {
            Object.assign(this.server.rooms, {
                [room]: [...this.server.rooms[room], this.client],
            });

            this.client.connection = {
                ...this.client.connection,
                rooms: [...this.client.connection.rooms, room],
            };

            return responseHandler(this.server.rooms[room], 'join-chat', {
                room,
            });
        } catch (error) {
            return errorHandler([this.client], { error: error.message });
        }
    };

    handleLeftChat = async ({ room }): Promise<ActionResponse> => {
        try {
            const {
                connection: {
                    rooms,
                    user: { id: userId, kordy },
                },
            } = this.client;

            rooms.splice(
                rooms.findIndex((userRoom) => userRoom === room),
                1,
            );

            this.server.rooms[room].splice(
                this.server.rooms[room].findIndex(
                    ({ connection: { user } }) => userId === user.id,
                ),
                1,
            );

            return responseHandler(this.server.rooms[room], 'left-chat', {
                user: { kordy },
                room,
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
