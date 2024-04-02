const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

describe('Sessions Router', () => {
  it('Debería devolver la sesión del usuario actual', (done) => {
    request(app)
      .get('/api/sessions/current')
      .set('Authorization', 'Bearer your_jwt_token')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('user');
        done();
      });
  });

});