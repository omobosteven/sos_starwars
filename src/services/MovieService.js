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
}

export default MovieService;
