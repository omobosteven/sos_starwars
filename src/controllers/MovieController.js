import MovieService from '../services/MovieService';
import ResponseUtil from '../utilities/ResponseUtils';

const util = new ResponseUtil();


class MovieController {
    static async getAllMovies(req, res) {
        const movies = req.movies;

        try {
            const allMovies = await MovieService.getAllMovies(movies);
            util.setSuccess(200, 'Movies retrieved', allMovies);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }

    static async getMovie(req, res) {
        const { slug } = req.params;
        const movies = req.movies;

        try {
            const movie = await MovieService.getMovie(slug, movies);
            util.setSuccess(200, 'Movie retrieved', movie);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }
}

export default MovieController;
