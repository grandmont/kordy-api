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
        this.config();
    }

    init() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '10mb' }));
    }

    config() {
        this.app.get('/', (_req, res) => {
            const {
                npm_package_version,
                npm_package_repository_url,
                NODE_ENV,
            } = process.env;

            res.json({
                name: 'kordy',
                version: npm_package_version,
                license: 'ISC',
                repository: npm_package_repository_url,
                environment: NODE_ENV,
            });
        });

        this.app.use(routes);
    }
}
