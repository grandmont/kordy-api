import WebSocket, { Server } from 'ws';
import jwt from 'jsonwebtoken';

// Types
import { UserInterface } from './models/User';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

// Services
import ActionService from './services/ActionService';

// Interfaces
interface ServerInterface extends Server {
    rooms: {
        waiting: ClientInterface[];
        addEventListener: CallableFunction;
    };
}

interface ClientInterface extends WebSocket {
    connection?: {
        rooms: string[];
        user: UserInterface;
    };
}

interface ResponseInterface {
    status: boolean;
    action: Action;
    data?: any;
    error?: any;
}

type Action =
    | 'join-chat'
    | 'left-chat'
    | 'chat-message'
    | 'disconnect'
    | 'join-waiting-list'
    | 'error';

// WebSocketServer class
export default class WebSocketServer {
    wss: ServerInterface;

    constructor() {
        // Creates an instance of Server and configures rooms
        this.wss = Object.assign(new Server({ noServer: true }), {
            rooms: {
                waitingInternal: [],
                waitingListener: (_value: any) => {},

                set waiting(value) {
                    this.waitingInternal = value;
                    this.waitingListener(value);
                },

                get waiting() {
                    return this.waitingInternal;
                },

                addEventListener: (listener: Function) => {
                    this.wss.rooms['waitingListener'] = listener;
                },
            },
        });

        this.init();
    }

    init = () => {
        this.wss.on('connection', (ws: ClientInterface) => {
            const actionService = new ActionService(
                this.wss,
                ws,
                this.broadcast,
            );

            ws.on('message', async (message: string) => {
                const { action, data } = JSON.parse(message);
                const { clients, response } = await actionService.handleAction(
                    action,
                    data,
                );

                this.broadcast(clients, response);
            });

            ws.on('close', async () => {
                const { clients, response } = await actionService.handleAction(
                    'disconnect',
                );

                this.broadcast(clients, response);
            });
        });
    };

    onUpgrade = async (
        request: IncomingMessage,
        socket: Socket,
        head: Buffer,
    ) => {
        const { token } = this.params(request);

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (error, client: UserInterface) => {
                if (error || !client || !client.id) {
                    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                    socket.destroy();
                    return;
                }

                this.wss.handleUpgrade(request, socket, head, (ws) =>
                    this.wss.emit(
                        'connection',
                        Object.assign(ws, {
                            connection: {
                                rooms: [],
                                user: client,
                            },
                        }),
                        request,
                    ),
                );
            },
        );
    };

    params = ({ url }: IncomingMessage): { token?: string } => {
        const params = {};
        const regex = /[?|&](\w+)=([^&]+)/g;
        [...url.matchAll(regex)].map((param) => {
            Object.assign(params, { [param[1]]: param[2] });
        });
        return params;
    };

    broadcast = (clients: Array<WebSocket>, response: ResponseInterface) => {
        // Broadcast only when there's clients to receive the response
        clients.length &&
            clients.forEach((ws) => {
                ws.readyState === WebSocket.OPEN &&
                    ws.send(JSON.stringify(response));
            });
    };
}

export { ServerInterface, ClientInterface, ResponseInterface, Action };
