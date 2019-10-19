const comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        episode_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        public_ip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    }, {
        timestamps: false,
    });

    return Comment;
};

export default comment;
