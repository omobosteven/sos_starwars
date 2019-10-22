import axios from 'axios';
import redis from 'redis';
import CustomError from '../utilities/CustomError';


const client = redis.createClient(6379);


const moviesRedisKey = 'movies';


const redisCache = (req, res, next) => {
    try {
        client.get(moviesRedisKey, (error, movies) => {
            if (error) {
                throw error;
            }

            if (movies) {
                req.movies = JSON.parse(movies);
                next();
            } else {
                axios.get('https://swapi.co/api/films')
                    .then((moviesData) => {
                        const { results } = moviesData.data;
                        client.setex(moviesRedisKey, 1800, JSON.stringify(results));
                        req.movies = results;
                        next();
                    })
                    .catch((err) => {
                        throw err;
                    });
            }
        });
    } catch (error) {
        throw new CustomError(500, 'Internal Server Error');
    }
};

export default redisCache;
