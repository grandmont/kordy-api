import dotenv from 'dotenv';
import yargs from 'yargs';
import chalk from 'chalk';

const { fsync, dev, prod } = yargs
    .usage('\nKordy CLI Usage:')
    .option('fsync', {
        description:
            'Forces Sequelize to drop the tables before server starts.',
    })
    .option('dev', {
        description: 'Starts the server in development mode.',
    })
    .option('prod', {
        description: 'Starts the server in production mode.',
    })
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .describe({
        help: 'Show help',
        version: 'Show version',
    })
    .epilog('Kordy - 2020, All rights reserved.').argv;

process.env.NODE_ENV = {
    dev: 'development',
    prod: 'production',
}[dev ? 'dev' : prod ? 'prod' : 'dev'];

dotenv.config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });

import Server from './src/server';
import { sequelize } from './src/config/database';

if (fsync) {
    console.log(
        `${chalk.yellow(
            'Warning!',
        )} Sequelize force sync will drop the tables when enabled.`,
    );
    sequelize.sync({ force: true });
}

const { app } = new Server();

const { PORT = 3001, DB_DATABASE } = process.env;

app.listen(PORT, () => {
    console.log(
        `${chalk.green('Success!')} Server listening on ${chalk.cyan(
            `http://localhost:${PORT}`,
        )}`,
    );

    sequelize
        .authenticate()
        .then(() =>
            console.log(
                `${chalk.green('Success!')} Connection to ${chalk.yellow(
                    DB_DATABASE,
                )} established.`,
            ),
        )
        .catch((error) => console.error(error));
});
