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
                username: 'puzansakya',
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
        let data = {
            title: 'test_title',
            description: 'test_desriptin',
        }
        let movie = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(data);

        expect(movie.status).to.equal(201);
        expect(movie).not.to.be.empty;
    }).timeout(5000);

    it('it should PUT exiting movie', async () => {
        let movie_date = {
            title: 'title to update',
            description: 'desscription to update',
        }

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(movie_date);

        let movie_data_to_update = {
            title: 'title is updated',
            description: 'desscription is updated',
        }

        let movie_update = await chai.request(app)
            .put('/api/v1/movies/' + movie_create.body.id)
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(movie_data_to_update);


        expect(movie_update.status).to.equal(204);
    }).timeout(5000);
    
    it('it should GET exiting movie detail', async () => {
        let movie_date = {
            title: 'title for detail',
            description: 'desscription for detail',
        }

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(movie_date);

        let movie_detail = await chai.request(app)
            .get('/api/v1/movies/' + movie_create.body.id)
            .set('Authorization', 'Bearer ' + auth.jwt)


        expect(movie_detail.status).to.equal(200);
    }).timeout(5000);
    
    it('it should DELETE an exiting movie', async () => {
        let movie_date = {
            title: 'title for detail',
            description: 'desscription for detail',
        }

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(movie_date);

        let movie_deleted = await chai.request(app)
            .delete('/api/v1/movies/' + movie_create.body.id)
            .set('Authorization', 'Bearer ' + auth.jwt)


        expect(movie_deleted.status).to.equal(204);
    }).timeout(5000);

});