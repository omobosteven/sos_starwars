import db from '../db/models';
import Helper from './helpers/HelperFunctions';
import CustomError from '../utilities/CustomError';

const { Comment } = db;


class MovieService {
    static async getAllMovies(allMovies) {
        try {
            const transformedMovies = await Helper.transformMovies(allMovies, Comment);

            return transformedMovies.sort((movieDate1, movieDate2) => {
                return new Date(movieDate1.release_date)
                > new Date(movieDate2.release_date) ? 1 : -1;
            });
        } catch (error) {
            throw new CustomError(500, 'Internal Server Error');
        }
    }

    static async getMovie(title, movies) {
        try {
            const movie = Helper.findMovie(movies, title);

            const movieData = Helper.getMovieData(movie, Comment);

            return movieData;
        } catch (error) {
            const status = error.status ? error.status : 500;
            throw new CustomError(status, status === 404 ? error.message : 'Internal Server Error');
        }
    }
}

export default MovieService;
