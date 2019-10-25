import CharacterService from '../services/CharacterService';
import ResponseUtil from '../utilities/ResponseUtils';

const util = new ResponseUtil();


class CharacterController {
    static async getAllCharacters(req, res) {
        const { slug } = req.params;
        const { sort, order, gender } = req.query;
        const movies = req.movies;

        try {
            const allCharacters = await CharacterService.getAllCharacters(
                slug, sort, order, gender, movies
            );
            util.setSuccess(200, 'Characters retrieved', allCharacters);
            return util.send(res);
        } catch (error) {
            util.setError(error.status, error.message);
            return util.send(res);
        }
    }
}

export default CharacterController;
