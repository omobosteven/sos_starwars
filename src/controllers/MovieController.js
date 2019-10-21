import MovieService from '../services/MovieService';
import Util from '../utilities/Utils';

const util = new Util();


class MovieController {
    static async getAllMovies(req, res) {
        try {
            const allMovies = await MovieService.getAllMovies();
            util.setSuccess(200, 'Movies retrieved', allMovies);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }
}

export default MovieController;
