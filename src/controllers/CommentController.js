import CommentService from '../services/CommentService';
import ResponseUtil from '../utilities/ResponseUtils';

const util = new ResponseUtil();


class CommentController {
    static async createComment(req, res) {
        const { comment } = req.body;
        const { slug } = req.params;
        const { publicIpAddress, movies } = req;

        try {
            const newComment = await CommentService.createComment(
                comment, slug, publicIpAddress, movies
            );
            util.setSuccess(201, 'Comment created', newComment);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }

    static async getComments(req, res) {
        const { slug } = req.params;
        const { movies } = req;

        try {
            const comments = await CommentService.getComments(movies, slug);
            util.setSuccess(200, 'Comments retrieved', comments);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }
}

export default CommentController;
