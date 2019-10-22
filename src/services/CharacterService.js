import Helper from './helpers/HelperFunctions';
import CustomError from '../utilities/CustomError';

class CharacterService {
    static async getAllCharacters(req) {
        const { title } = req.params;
        const { sort, filter } = req.query;

        try {
            const movies = req.movies;

            const movie = movies.find((data) => {
                return data.title.toLowerCase() === title.replace(/_|-/g, ' ').toLowerCase();
            });

            if (!movie) {
                throw new CustomError(404, 'movie was not found');
            }

            let movieCharacters = await Helper.getMovieCharactersUrls(movie.characters);

            if (filter) {
                const gender = filter.split(':');
                const filterGender = gender[gender.length - 1].toLowerCase();

                movieCharacters = movieCharacters.filter((data) => {
                    return data.gender === filterGender;
                });
            }

            if (sort) {
                const sortParams = sort.split(':');
                const sortBy = sortParams[0].toLowerCase();
                const order = sortParams[sortParams.length - 1].toLowerCase();

                movieCharacters.sort((character1, character2) => {
                    let firstCharacter = character1[sortBy];
                    let secondCharacter = character2[sortBy];

                    if (sortBy === 'height') {
                        firstCharacter = parseInt(firstCharacter, 10);
                        secondCharacter = parseInt(secondCharacter, 10);
                    }

                    return firstCharacter > secondCharacter ? 1 : -1;
                });

                movieCharacters = order === 'desc' ? movieCharacters.reverse() : movieCharacters;
            }

            const characters = {
                total_heights: Helper.calculateHeight(movieCharacters),
                total_characters: movieCharacters.length,
                characters: movieCharacters
            };

            return characters;
        } catch (error) {
            const status = error.status ? error.status : 500;
            throw new CustomError(status, status === 404 ? error.message : 'Internal Server Error');
        }
    }
}

export default CharacterService;
