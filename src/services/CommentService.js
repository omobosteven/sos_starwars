import db from '../db/models';
import CustomError from '../utilities/CustomError';

const { Comment } = db;


class CommentService {
    static async createComment(req, title, commentData) {
        try {
            const movies = req.movies;

            const movie = movies.find((data) => {
                return data.title.toLowerCase() === title.replace(/_|-/g, ' ').toLowerCase();
            });

            if (!movie) {
                throw new CustomError(404, 'movie was not found');
            }

            const { publicIpAddress, comment } = commentData;
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

    static async getComments(req, title) {
        try {
            const movies = req.movies;

            const movie = movies.find((data) => {
                return data.title.toLowerCase() === title.replace(/_|-/g, ' ').toLowerCase();
            });

            if (!movie) {
                throw new CustomError(404, 'movie was not found');
            }

            const comments = await Comment.findAll({
                where: { movie_title: title.replace(/_|-/g, ' ').toLowerCase() },
                order: [['created_at', 'DESC']]
            });

            return comments;
        } catch (error) {
            throw new CustomError(500, 'Internal Server Error');
        }
    }
}

export default CommentService;
