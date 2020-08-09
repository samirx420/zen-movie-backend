import * as chai from 'chai';
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

        auth.user = login.body;
        auth.jwt = login.body.jwt;

    };
}

describe.skip('Watch list', () => {

    it('it should GET all watchlist movies for a user', async () => {

        let watch_list = await chai.request(app)
            .get('/api/v1/watchlists')
            .set('Authorization', 'Bearer ' + auth.jwt);

        expect(watch_list.status).to.equal(200);
        expect(watch_list).not.to.be.empty;
    }).timeout(5000);

    it('it should POST a movie to watch list', async () => {

        let movie = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

        console.log(movie.body);
        let watch_list_data = {
            movie_id: movie.body.id,
            user_id: auth.user.id,
        }
        let watch_list_create = await chai.request(app)
            .post('/api/v1/watchlists')
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .send(watch_list_data);

        expect(watch_list_create.status).to.equal(201);
        expect(watch_list_create).not.to.be.empty;
    }).timeout(5000);

    it('it should DELETE a movie from watch list for provided id', async () => {
      
        let create_movie = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

        let watch_list_data = {
            movie_id: create_movie.body.id,
            user_id: auth.user.id,
        }
        let create_watch_list = await chai.request(app)
            .post('/api/v1/watchlists')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .send(watch_list_data);

        let delete_watchlist_by_movie_id = await chai.request(app)
            .delete('/api/v1/watchlists/' + create_movie.body.id)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .set('Authorization', 'Bearer ' + auth.jwt)


        expect(delete_watchlist_by_movie_id.status).to.equal(204);
    }).timeout(5000);

});