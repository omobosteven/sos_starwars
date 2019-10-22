import express from 'express';
import movies from './movies';
import comments from './comments';
import characters from './characters';

const api = express.Router();

api.use('/movies', movies);
api.use('/movies', comments);
api.use('/movies', characters);

export default api;
