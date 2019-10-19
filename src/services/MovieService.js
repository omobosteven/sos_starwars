import axios from 'axios';
import db from '../db/models';
import ServerError from '../utilities/ServerError';

const { Comment } = db;


class MovieService {
    static async getAllMovies() {
        try {
            const response = await axios.get('https://swapi.co/api/films');
            const allMovies = response.data.results;

            const transformedMovies = allMovies.map(async (movie) => {
                const movies = {
                    title: movie.title,
                    release_date: movie.release_date,
                    opening_crawl: movie.opening_crawl,
                    comment_counts: await Comment.count({ where: { episode_id: movie.episode_id } })
                        .then((count) => count)
                        .catch(() => { throw new ServerError(); })
                };

                return movies;
            });

            return Promise.all(transformedMovies).then((data) => {
                data.sort((movieDate1, movieDate2) => {
                    return new Date(movieDate1.release_date)
                    > new Date(movieDate2.release_date) ? 1 : -1;
                });

                return data;
            });
        } catch (error) {
            throw new ServerError();
        }
    }
}

export default MovieService;
