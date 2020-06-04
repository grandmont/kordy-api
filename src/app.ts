import './config/environment';
import http from 'http';
import WebSocketServer from './websocket';
import Server from './server';
import './config/database';

const server = http.createServer(new Server().app);

const { PORT = 3001 } = process.env;

server.on('upgrade', new WebSocketServer().onUpgrade);
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
