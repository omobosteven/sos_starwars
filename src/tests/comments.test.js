import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import app from '../index';
import response from './response';

chai.use(chaiHttp);

describe('Test API endpoint to post and get comments', () => {
    beforeEach(() => {
        nock('https://swapi.co/api')
            .get('/films')
            .reply(200, response);
    });

    it('should post a comment for a movie', (done) => {
        chai.request(app)
            .post('/api/movies/test_movie/comments')
            .set('Content-type', 'application/json')
            .send({ comment: 'interesting' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.data.comment).to.equal('interesting');
                done();
            });
    });

    it('should return error if movie is not found', (done) => {
        chai.request(app)
            .post('/api/movies/test_movie_so/comments')
            .set('Content-type', 'application/json')
            .send({ comment: 'interesting' })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.message).to.equal('movie was not found');
                done();
            });
    });

    it('should return error if comment is empty', (done) => {
        chai.request(app)
            .post('/api/movies/test_movie/comments')
            .set('Content-type', 'application/json')
            .send({ comment: '' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Oops, comment cannot be empty');
                done();
            });
    });

    it('should return comments for a movie', (done) => {
        chai.request(app)
            .get('/api/movies/test_movie/comments')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data.length).to.equal(1);
                done();
            });
    });
});
