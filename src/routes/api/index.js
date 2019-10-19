import express from 'express';
import movies from './movies';

const api = express.Router();

api.use('/movies', movies);

export default api;
