import express from 'express';
import movies from './movies';
import comments from './comments';

const api = express.Router();

api.use('/movies', movies);
api.use('/movies', comments);

export default api;
