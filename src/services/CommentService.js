import db from '../db/models';
import Helper from './helpers/HelperFunctions';
import CustomError from '../utilities/CustomError';

const { Comment } = db;


class CommentService {
    static async createComment(comment, slug, publicIpAddress, movies) {
        try {
            const movie = Helper.findMovie(movies, slug);

            const newComment = {
                movie_title: movie.title.toLowerCase(),
                public_ip: publicIpAddress,
                comment
            };

            return await Comment.create(newComment);
        } catch (error) {
            const status = error.status ? error.status : 500;
            throw new CustomError(status, status === 404 ? error.message : 'Internal Server Error');
        }
    }

    static async getComments(movies, slug) {
        try {
            Helper.findMovie(movies, slug);

            const comments = await Comment.findAll({
                where: { slug },
                attributes: { exclude: ['id', 'slug'] },
                order: [['created_at', 'DESC']]
            });

            return comments;
        } catch (error) {
            throw new CustomError(500, 'Internal Server Error');
        }
    }
}

export default CommentService;
