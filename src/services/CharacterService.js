import Helper from './helpers/HelperFunctions';
import CustomError from '../utilities/CustomError';

class CharacterService {
    static async getAllCharacters(slug, sort, order, gender, movies) {
        try {
            const movie = Helper.findMovie(movies, slug);

            let movieCharacters = await Helper.getMovieCharactersUrls(movie.characters);

            if (gender) {
                movieCharacters = Helper.filterCharacter(gender, movieCharacters);
            }

            if (sort) {
                movieCharacters = Helper.sortCharacter(sort, movieCharacters);
            }

            if (order) {
                Helper.orderCharacter(order, movieCharacters);
            }

            const totalHeight = Helper.calculateHeight(movieCharacters);

            const characters = {
                metadata: {
                    total_heights_in_cm: totalHeight.cm,
                    total_heights_in_feet: totalHeight.feet,
                    total_characters: movieCharacters.length,
                },
                characters: movieCharacters
            };

            return characters;
        } catch (error) {
            console.log(error.message);
            const status = error.status ? error.status : 500;
            throw new CustomError(status, status === 404 ? error.message : 'Internal Server Error');
        }
    }
}

export default CharacterService;
