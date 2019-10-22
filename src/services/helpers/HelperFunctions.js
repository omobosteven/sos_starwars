import axios from 'axios';

class HelperFunctions {
    static getMovieCharactersUrls(characters) {
        return Promise.all(
            characters.map(async (characterUrl) => {
                const characterData = await axios.get(characterUrl);
                const { data } = characterData;

                return data;
            })
        );
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

        const totalHeight = `${feet}ft and ${inches} inches`;

        return totalHeight;
    }
}

export default HelperFunctions;
