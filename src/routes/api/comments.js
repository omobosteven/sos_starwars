import express from 'express';
import CommentController from '../../controllers/CommentController';
import CommentValidation from '../../middlewares/validations/CommentValidation';

const comments = express.Router();

comments.post('/:title/comments', CommentValidation.validateComment, CommentController.createComment);
comments.get('/:title/comments', CommentController.getComments);

export default comments;
