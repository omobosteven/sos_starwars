import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import app from '../index';
import response from './response';

chai.use(chaiHttp);

describe('Test API endpoint to get characters', () => {
    beforeEach(() => {
        nock('https://swapi.co/api')
            .get('/films')
            .reply(200, response)
            .get('/people/1/')
            .reply(200, response.person1)
            .get('/people/2/')
            .reply(200, response.person2)
            .get('/people/3/')
            .reply(200, response.person3);
    });

    it('should get characters for a movie', (done) => {
        chai.request(app)
            .get('/api/movies/test_movie/characters')
            .end((err, res) => {
                console.log(res);
                expect(res).to.have.status(200);
                expect(res.body.data.total_characters).to.equal(1);
                done();
            });
    });
});
