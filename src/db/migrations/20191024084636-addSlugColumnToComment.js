module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Comment', 'slug', {
            type: Sequelize.STRING
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Comment', 'slug');
    }
};
