module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.sequelize.transaction(() =>
            Promise.all([
                queryInterface.addColumn('posts', 'userId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                }),

                queryInterface.addColumn('comments', 'userId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                }),

                queryInterface.addColumn('comments', 'postId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'posts',
                        key: 'id',
                    },
                }),

                queryInterface.addColumn('reactions', 'userId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                }),

                queryInterface.addColumn('reactions', 'postId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'posts',
                        key: 'id',
                    },
                }),

                queryInterface.addColumn('relationships', 'followerId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                }),

                queryInterface.addColumn('relationships', 'userId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                }),

                queryInterface.addColumn('messages', 'userId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                }),

                queryInterface.addColumn('messages', 'chatId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'chats',
                        key: 'id',
                    },
                }),
            ]),
        ),

    down: (queryInterface, _Sequelize) =>
        queryInterface.sequelize.transaction(() =>
            Promise.all([queryInterface.removeColumn('posts', 'userId')]),
        ),
};
