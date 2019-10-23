import db from '../db/models';
import CustomError from '../utilities/CustomError';

const { Comment } = db;


class MovieService {
    static async getAllMovies(req) {
        try {
            const allMovies = req.movies;

            const transformedMovies = allMovies.map(async (movie) => {
                const movies = {
                    title: movie.title,
                    release_date: movie.release_date,
                    opening_crawl: movie.opening_crawl,
                    comment_counts: await Comment.count(
                        { where: { movie_title: movie.title.toLowerCase() } }
                    )
                        .then((count) => count)
                        .catch(() => { throw new CustomError(500, 'Internal Server Error'); })
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
            throw new CustomError(500, 'Internal Server Error');
        }
    }

    static async getMovie(req) {
        const { title } = req.params;

        try {
            const movies = req.movies;

            const movie = movies.find((data) => {
                return data.title.toLowerCase() === title.replace(/_|-/g, ' ').toLowerCase();
            });

            if (!movie) {
                throw new CustomError(404, 'movie was not found');
            }

            const movieData = {
                title: movie.title,
                release_date: movie.release_date,
                opening_crawl: movie.opening_crawl,
                comment_counts: await Comment.count(
                    { where: { movie_title: movie.title.toLowerCase() } }
                )
                    .then((count) => count)
                    .catch(() => { throw new CustomError(500, 'Internal Server Error'); })
            };

            return movieData;
        } catch (error) {
            const status = error.status ? error.status : 500;
            throw new CustomError(status, status === 404 ? error.message : 'Internal Server Error');
        }
    }
}

export default MovieService;
