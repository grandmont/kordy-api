module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(() =>
            Promise.all([
                queryInterface.createTable('users', {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    fly: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        unique: true,
                    },
                    name: {
                        type: Sequelize.STRING,
                    },
                    email: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        unique: true,
                    },
                    password: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    profile: {
                        type: Sequelize.STRING,
                    },
                    bio: {
                        type: Sequelize.STRING,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                }),

                queryInterface.createTable('posts', {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    text: {
                        type: Sequelize.STRING,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                }),

                queryInterface.createTable('comments', {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    comment: {
                        type: Sequelize.STRING,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                }),

                queryInterface.createTable('reactions', {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                }),

                queryInterface.createTable('relationships', {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                }),

                queryInterface.createTable('images', {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                }),

                queryInterface.createTable('chats', {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    name: {
                        type: Sequelize.STRING,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                }),

                queryInterface.createTable('messages', {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    content: {
                        type: Sequelize.STRING,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                }),
            ]),
        ),

    down: (queryInterface, _Sequelize) =>
        queryInterface.sequelize.transaction(() =>
            Promise.all([
                queryInterface.dropTable('users'),
                queryInterface.dropTable('posts'),
            ]),
        ),
};
