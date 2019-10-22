import express from 'express';
import MovieController from '../../controllers/MovieController';
import redisCache from '../../middlewares/redisCache';

const movies = express.Router();

movies.get('/', redisCache, MovieController.getAllMovies);

export default movies;
