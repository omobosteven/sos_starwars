import slugify from 'slugify';

const comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        slug: {
            type: DataTypes.STRING,
        },
        movie_title: {
            type: DataTypes.STRING,
            allowNull: false
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

    Comment.beforeCreate((commentInstance) => {
        const title = commentInstance.movie_title;

        commentInstance.slug = slugify(title, {
            replacement: '-',
            lower: true
        });

        return commentInstance.slug;
    });

    return Comment;
};

export default comment;
