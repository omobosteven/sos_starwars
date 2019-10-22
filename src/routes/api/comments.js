import express from 'express';
import CommentController from '../../controllers/CommentController';
import CommentValidation from '../../middlewares/validations/CommentValidation';
import redisCache from '../../middlewares/redisCache';
import getPublicIpAddress from '../../middlewares/getPublicIpAddress';

const comments = express.Router();

comments.post('/:title/comments',
    getPublicIpAddress, redisCache,
    CommentValidation.validateComment, CommentController.createComment);
comments.get('/:title/comments', redisCache, CommentController.getComments);

export default comments;
