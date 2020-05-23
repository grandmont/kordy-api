import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

export default class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.init();
    }

    init() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(routes);
    }
}
