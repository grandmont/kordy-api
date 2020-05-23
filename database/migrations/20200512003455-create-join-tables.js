module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(() =>
            Promise.all([
                queryInterface.createTable('posts_images', {
                    imageId: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        references: {
                            model: 'images',
                            key: 'id',
                        },
                    },
                    postId: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        references: {
                            model: 'posts',
                            key: 'id',
                        },
                    },
                }),

                queryInterface.createTable('users_chats', {
                    userId: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        references: {
                            model: 'users',
                            key: 'id',
                        },
                    },
                    chatId: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        references: {
                            model: 'chats',
                            key: 'id',
                        },
                    },
                }),
            ]),
        ),

    down: (queryInterface, _Sequelize) =>
        queryInterface.sequelize.transaction(() =>
            Promise.all([queryInterface.dropTable('posts_images')]),
        ),
};
