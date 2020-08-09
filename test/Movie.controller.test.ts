import * as chai from 'chai';
import * as fs from 'fs';
import chaiHttp = require('chai-http');

import app from '../src/web/app';

const expect = chai.expect;

chai.use(chaiHttp);

var auth: any = {};
before(loginUser(auth));

function loginUser(auth) {
    return async () => {
        let login = await chai.request(app)
            .post('/api/v1/users/login')
            .send({
                username: 'testuser',
                password: 'password'
            });

        auth.jwt = login.body.jwt;

    };
}

describe('Movie', () => {


    it('it should GET all movies', async () => {

        let movies = await chai.request(app)
            .get('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt);

        expect(movies.status).to.equal(200);
        expect(movies).not.to.be.empty;
    }).timeout(5000);

    it('it should POST new movie', async () => {

        let movie = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

        expect(movie.status).to.equal(201);
        expect(movie).not.to.be.empty;
    }).timeout(5000);

    it('it should PUT exiting movie', async () => {
        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .field('title', 'test_title')
            .field('description', 'test_description');

        let movie_update = await chai.request(app)
            .put('/api/v1/movies/' + movie_create.body.id)
            .set('Authorization', 'Bearer ' + auth.jwt)
            .field('title', 'title is updated')
            .field('description', 'desscription is updated');


        expect(movie_update.status).to.equal(204);
    }).timeout(5000);

    it('it should GET exiting movie detail', async () => {

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .field('title', 'title for detail')
            .field('description', 'desscription for detail');

        let movie_detail = await chai.request(app)
            .get('/api/v1/movies/' + movie_create.body.id)
            .set('Authorization', 'Bearer ' + auth.jwt)


        expect(movie_detail.status).to.equal(200);
    }).timeout(5000);

    it('it should DELETE an exiting movie', async () => {

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .field('title', 'title for detail')
            .field('description', 'desscription for detail');

        let movie_deleted = await chai.request(app)
            .delete('/api/v1/movies/' + movie_create.body.id)
            .set('Authorization', 'Bearer ' + auth.jwt)


        expect(movie_deleted.status).to.equal(204);
    }).timeout(5000);

});