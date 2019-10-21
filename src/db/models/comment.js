const comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        movie_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        public_ip: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamp: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: false,
        tableName: 'Comment',
        freezeTableName: true
    });

    return Comment;
};

export default comment;
