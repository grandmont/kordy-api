import WebSocket from 'ws';
import jwt from 'jsonwebtoken';

import ActionService from './services/ActionService';

export default class WebSocketServer {
    wss: WebSocket.Server;

    constructor() {
        this.wss = new WebSocket.Server({ noServer: true });
        this.init();
    }

    init = () => {
        this.wss.on('connection', (ws, req) => {
            const {
                user: { kordy },
            } = ws;

            const actionService = new ActionService({
                server: this.wss,
                client: ws,
            });

            console.log(`${kordy} connected.`);

            ws.on('message', async (data) => {
                const { clients, response } = await actionService.handleAction(
                    JSON.parse(data),
                );
                this.broadcast(clients, response);
            });

            ws.on('close', () => {
                console.log(`${kordy} disconnected.`);
            });
        });
    };

    onUpgrade = async (request, socket, head) => {
        const { token } = this.params(request);

        jwt.verify(token, process.env.JWT_SECRET, (error, client) => {
            if (error || !client || !client.id) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }

            this.wss.handleUpgrade(request, socket, head, (ws) => {
                const { iat, exp, ...user } = client;
                this.wss.emit(
                    'connection',
                    Object.assign(ws, { user }),
                    request,
                );
            });
        });
    };

    params = ({ url }) => {
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
