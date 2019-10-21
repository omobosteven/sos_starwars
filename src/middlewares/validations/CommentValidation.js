import Util from '../../utilities/Utils';

const util = new Util();

class CommentValidator {
    static validateComment(req, res, next) {
        const { comment } = req.body;

        if (!comment || comment.trim().length < 1) {
            util.setError(400, 'Oops, comment cannot be empty');
            return util.send(res);
        }

        if (comment.trim().length > 500) {
            util.setError(400, 'Oops, comment is too long, >500');
            return util.send(res);
        }

        return next();
    }
}

export default CommentValidator;
