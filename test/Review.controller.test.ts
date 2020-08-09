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
                username: 'samach',
                password: 'password'
            });

        auth.jwt = login.body.jwt;

    };
}

describe('Review', () => {

    it('it should GET all reviews for a movie', async () => {

        let watch_list = await chai.request(app)
        .get('/api/v1/watchlists')
        .set('Authorization', 'Bearer ' + auth.jwt);

    expect(watch_list.status).to.equal(200);
    expect(watch_list).not.to.be.empty;

    }).timeout(5000);

    it('it should POST a review for a movie', async () => {
        let movie = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .field('title', 'test_title')
            .field('description', 'test_desriptin');

        let watch_list_data = {
            movie_id: movie.body.id,
            user_id: auth.user.id,
        }
        let watch_list_create = await chai.request(app)
            .post('/api/v1/watchlists')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(watch_list_data);

        expect(watch_list_create.status).to.equal(201);
        expect(watch_list_create).not.to.be.empty;
    }).timeout(5000);

    it('it should DELETE a review from from movie for provided id', async () => {
        let data = {
            title: 'test_title',
            description: 'test_desriptin',
        }
        let create_movie = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(data);

        let watch_list_data = {
            movie_id: create_movie.body.id,
            user_id: auth.user.id,
        }
        let create_watch_list = await chai.request(app)
            .post('/api/v1/watchlists')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(watch_list_data);

        let delete_watchlist_by_movie_id = await chai.request(app)
            .delete('/api/v1/watchlists/' + create_movie.body.id)
            .set('Authorization', 'Bearer ' + auth.jwt)


        expect(delete_watchlist_by_movie_id.status).to.equal(204);
    }).timeout(5000);

});