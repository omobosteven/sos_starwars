import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import app from '../index';
import response from './response';

chai.use(chaiHttp);

describe('Test API endpoint to get movies', () => {
    beforeEach(() => {
        nock('https://swapi.co')
            .get('/api/films')
            .reply(200, response);
    });

    it('should get all movies', (done) => {
        chai.request(app)
            .get('/api/movies')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data.length).to.equal(2);
                done();
            });
    });
});
