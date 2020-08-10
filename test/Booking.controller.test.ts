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

describe('Booking', () => {

    it('it should POST new booking for a movie by a selected user', async () => {

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

            let payload  = {
                "movie_id": movie_create.body.id,
                "booking_date": "2020-08-08",
                "show_time": "9:00"

            }
                

        let booking_create = await chai.request(app)
        .post('/api/v1/bookings')
        .set('Authorization', 'Bearer ' + auth.jwt)
        .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
        .send(payload)
            
    expect(booking_create.status).to.equal(201);
    expect(booking_create).not.to.be.empty;

    }).timeout(5000);

    it('it should GET all bookings for a selected movie', async () => {

        let movie_create = await chai.request(app)
            .post('/api/v1/movies')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('title', 'test_title')
            .field('description', 'test_description');

            let payload  = {
                "movie_id": movie_create.body.id,
                "booking_date": "2020-08-08",
                "show_time": "9:00",
                
                
            }
            let booking_create = await chai.request(app)
            .post('/api/v1/bookings')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .send(payload)
                

            

        
        let booking_fetched = await chai.request(app)
        .get('/api/v1/bookings/')
        .set('Authorization', 'Bearer ' + auth.jwt)
        .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG');

            
    expect(booking_fetched.status).to.equal(200);
    expect(booking_fetched.body).to.have.own.property('data');
    expect(booking_fetched.body).to.have.own.property('paged');
    expect(booking_fetched.body.data).not.to.be.empty;
    expect(booking_fetched.body.paged).not.to.be.empty;

    }).timeout(5000);

  

    



});