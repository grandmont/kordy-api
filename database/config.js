const dotenv = require('dotenv');

dotenv.config({
    path: `${__dirname}/.env.${process.env.NODE_ENV || 'development'}`,
});

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DIALECT } = process.env;

module.exports = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    dialect: DB_DIALECT,
    operatorAliases: false,
    logging: false,
    define: {
        timestamps: true,
    },
};
