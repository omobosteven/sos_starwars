import MovieService from '../services/MovieService';
import ResponseUtil from '../utilities/ResponseUtils';

const util = new ResponseUtil();


class MovieController {
    static async getAllMovies(req, res) {
        try {
            const allMovies = await MovieService.getAllMovies(req);
            util.setSuccess(200, 'Movies retrieved', allMovies);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }
}

export default MovieController;
