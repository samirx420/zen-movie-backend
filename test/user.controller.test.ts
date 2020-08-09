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

describe('User', () => {


    it('it should register user', async () => {

        let user_created = await chai.request(app)
            .post('/api/v1/users/register')
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .field('first_name', 'test')
            .field('last_name', 'user')
            .field('username', 'testuser')
            .field('password', 'password')
            .attach('avatar', './test/test.png');

        expect(user_created.status).to.equal(201);
        expect(user_created).not.to.be.empty;
    }).timeout(5000);

    it('it should login user', async() => {
        let data = {
            username: "testuser",
            password: "password",
        };
        let user_login = await chai.request(app)
            .post('/api/v1/users/login')
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .send(data);

            expect(user_login.status).to.equal(200);
            expect(user_login.body).not.to.be.empty;
    });

    it('it should GET current profile', async () => {

        let login_cred = await chai
            .request(app)
            .post('/api/v1/users/login')
            .send({
                username: 'testuser',
                password: 'password'
            })

        let me = await chai.request(app)
            .get('/api/v1/users/me')
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .set('Authorization', 'Bearer ' + auth.jwt);

        expect(me.status).to.equal(200);
        expect(me).not.to.be.empty;
    }).timeout(5000);

    it('it should update user', async () => {

        let user_created = await chai.request(app)
            .put('/api/v1/users/me')
            .set('api_key', '$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG')
            .set('Authorization', 'Bearer ' + auth.jwt)
            .field('first_name', 'franklinp')
            .field('last_name', 'Isaiah')
            .field('password', 'password')
            .attach('avatar', './test/test.png');

        expect(user_created.status).to.equal(201);
        expect(user_created).not.to.be.empty;
    }).timeout(5000);

});