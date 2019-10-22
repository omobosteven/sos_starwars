import express from 'express';
import CharacterController from '../../controllers/CharacterController';
import QueryValidation from '../../middlewares/validations/QueryValidation';
import redisCache from '../../middlewares/redisCache';

const characters = express.Router();

characters.get('/:title/characters',
    QueryValidation.validateQuery, redisCache, CharacterController.getAllCharacters);

export default characters;
