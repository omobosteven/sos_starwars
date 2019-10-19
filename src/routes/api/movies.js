import express from 'express';
import MovieController from '../../controllers/MovieController';

const movies = express.Router();

movies.get('/', MovieController.getAllMovies);

export default movies;
