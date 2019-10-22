import publicIp from 'public-ip';
import CommentService from '../services/CommentService';
import ResponseUtil from '../utilities/ResponseUtils';

const util = new ResponseUtil();


class CommentController {
    static async createComment(req, res) {
        const { comment } = req.body;
        const { title } = req.params;
        const publicIpAddress = await publicIp.v4();

        try {
            const newComment = await CommentService.createComment(
                req, title, { comment, publicIpAddress }
            );
            util.setSuccess(201, 'Comment created', newComment);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }

    static async getComments(req, res) {
        const { title } = req.params;

        try {
            const comments = await CommentService.getComments(req, title);
            util.setSuccess(200, 'Comments retrieved', comments);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }
}

export default CommentController;
