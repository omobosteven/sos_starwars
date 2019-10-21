module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Comment', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            movie_title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            comment: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            public_ip: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Comment');
    }
};
