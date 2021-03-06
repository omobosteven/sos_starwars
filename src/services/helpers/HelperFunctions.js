import axios from 'axios';
import slugify from 'slugify';
import CustomError from '../../utilities/CustomError';

class HelperFunctions {
    static getMovieCharactersUrls(characters) {
        return Promise.all(characters.map(async (characterUrl) => {
            const characterData = await axios.get(characterUrl);
            const { data } = characterData;

            return data;
        }));
    }

    static async getMovieData(movie, Comment) {
        const movieData = {
            title: movie.title,
            slug: HelperFunctions.slugifyTitle(movie.title),
            release_date: movie.release_date,
            opening_crawl: movie.opening_crawl,
            comment_counts: await Comment.count(
                { where: { movie_title: movie.title.toLowerCase() } }
            )
                .then((count) => count)
                .catch(() => { throw new CustomError(500, 'Internal Server Error'); })
        };

        return movieData;
    }

    static transformMovies(allMovies, Comment) {
        return Promise.all(allMovies.map(async (movie) => {
            const movieData = HelperFunctions.getMovieData(movie, Comment);

            return movieData;
        }));
    }

    static findMovie(movies, slug) {
        const movie = movies.find((data) => {
            return data.title.toLowerCase() === slug.replace(/-/g, ' ').toLowerCase();
        });

        if (!movie) {
            throw new CustomError(404, 'movie was not found');
        }

        return movie;
    }

    static calculateHeight(characters) {
        const height = characters.reduce(
            (accumulator, character) => accumulator + parseInt(character.height, 10), 0
        );
        const heightInFeet = height * 0.0328084;
        const feet = parseInt(heightInFeet, 10);
        // eslint-disable-next-line prefer-template
        const decPart = parseFloat(`0.${(heightInFeet + '').split('.')[1]}`);
        const inches = (decPart * 12).toFixed(2);

        const totalHeight = {
            cm: `${height}cm`,
            feet: `${feet}ft and ${inches} inches`
        };

        return totalHeight;
    }

    static sortCharacter(sort, characters) {
        const sortBy = sort.toLowerCase();

        return characters.sort((character1, character2) => {
            let firstCharacter = character1[sortBy];
            let secondCharacter = character2[sortBy];

            if (sortBy === 'height') {
                firstCharacter = parseInt(firstCharacter, 10);
                secondCharacter = parseInt(secondCharacter, 10);
            }

            return firstCharacter > secondCharacter ? 1 : -1;
        });
    }

    static orderCharacter(order, characters) {
        const orderBy = order.toLowerCase();

        return orderBy === 'desc' ? characters.reverse() : characters;
    }

    static filterCharacter(gender, characters) {
        const movieCharacters = characters.filter((data) => {
            return data.gender === gender;
        });

        return movieCharacters;
    }

    static slugifyTitle(title) {
        return slugify(title, {
            replacement: '-',
            lower: true
        });
    }
}

export default HelperFunctions;
