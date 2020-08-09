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

describe('Review', () => {

    it('it should POST new reviews for a movie', async () => {

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

            let payload  = {
                "movie_id": movie_create.body.id,
                "review": "this is best movie"
            }

        let review_create = await chai.request(app)
        .post('/api/v1/reviews')
        .set('Authorization', 'Bearer ' + auth.jwt)
        .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
        .send(payload)
            
    expect(review_create.status).to.equal(201);
    expect(review_create).not.to.be.empty;

    }).timeout(5000);

    it('it should GET all reviews for a selected movie', async () => {

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

            let payload  = {
                "movie_id": movie_create.body.id,
                "review": "this is best movie"
            }

        let review_create = await chai.request(app)
        .post('/api/v1/reviews')
        .set('Authorization', 'Bearer ' + auth.jwt)
        .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
        .send(payload)

        
        let review_fetched = await chai.request(app)
        .get('/api/v1/reviews/' + movie_create.body.id)
        .set('Authorization', 'Bearer ' + auth.jwt)
        .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG');

            
    expect(review_fetched.status).to.equal(200);
    expect(review_fetched.body).to.have.own.property('data');
    expect(review_fetched.body).to.have.own.property('paged');
    expect(review_fetched.body.data).not.to.be.empty;
    expect(review_fetched.body.paged).not.to.be.empty;

    }).timeout(5000);

    it('it should DELETE a review for a selected movie', async () => {

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

            let payload  = {
                "movie_id": movie_create.body.id,
                "review": "this is best movie"
            }

        let review_create = await chai.request(app)
        .post('/api/v1/reviews')
        .set('Authorization', 'Bearer ' + auth.jwt)
        .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
        .send(payload)

        
        
        let review_delete = await chai.request(app)
        .delete('/api/v1/reviews/' + review_create.body.id)
        .set('Authorization', 'Bearer ' + auth.jwt)
        .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
        
            
    expect(review_delete.status).to.equal(204);

    

    }).timeout(5000);

    it('it should PUT a review for a selected movie', async () => {

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

            let review_payload  = {
                "movie_id": movie_create.body.id,
                "review": "this is best movie"
            }

        let review_create = await chai.request(app)
        .post('/api/v1/reviews')
        .set('Authorization', 'Bearer ' + auth.jwt)
        .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
        .send(review_payload)

        let payload_update  = {
            "movie_id": movie_create.body.id,
            "review": "this is best movie two times"
        }

        
        let review_update = await chai.request(app)
            .put('/api/v1/reviews/' + review_create.body.id )
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .send(payload_update)
           
        
        console.log('review_update', review_update.body)
            
    expect(review_update.status).to.equal(201);
    expect(review_update.body).to.equal(1);

    

    }).timeout(5000);



});