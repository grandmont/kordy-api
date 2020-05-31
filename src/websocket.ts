import WebSocket from 'ws';
import jwt from 'jsonwebtoken';

// Types
import { UserInterface } from './models/User';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

// Services
import ActionService from './services/ActionService';

// Interfaces
interface ServerInterface extends WebSocket.Server {
    openChats?: object;
}

interface ClientInterface extends WebSocket {
    user?: UserInterface;
}

interface ParamsInterface {
    token?: string;
}

// WebSocketServer class
export default class WebSocketServer {
    wss: ServerInterface;

    constructor() {
        this.wss = new WebSocket.Server({ noServer: true });
        this.init();
    }

    init = () => {
        this.wss.on('connection', (ws: ClientInterface) => {
            const {
                user: { kordy },
            } = ws;

            const actionService = new ActionService({
                server: this.wss,
                client: ws,
            });

            console.log(`${kordy} connected.`);

            ws.on('message', async (data: string) => {
                try {
                    const {
                        clients,
                        response,
                    } = await actionService.handleAction(JSON.parse(data));
                    this.broadcast(clients, response);
                } catch (error) {}
            });

            ws.on('close', () => {
                console.log(`${kordy} disconnected.`);
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
                        Object.assign(ws, { user: client }),
                        request,
                    ),
                );
            },
        );
    };

    params = ({ url }: IncomingMessage): ParamsInterface => {
        const params = {};
        const regex = /[?|&](\w+)=([^&]+)/g;
        [...url.matchAll(regex)].map((param) => {
            Object.assign(params, { [param[1]]: param[2] });
        });
        return params;
    };

    broadcast = (clients, message) => {
        clients.forEach((ws) => {
            ws.readyState === WebSocket.OPEN &&
                ws.send(JSON.stringify(message));
        });
    };
}

export { ServerInterface, ClientInterface, ParamsInterface };
