const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

describe('Sessions Endpoints', () => {
  it('Debería devolver una cookie llamada unprotectedCookie de /unprotectedLogin', (done) => {
    request(app)
      .get('/unprotectedLogin')
      .expect(200)
      .expect('set-cookie', /unprotectedCookie/)
      .end(done);
  });

  it('Debería devolver el usuario completo de /unprotectedCurrent', (done) => {
    request(app)
      .get('/unprotectedCurrent')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        const user = res.body.user;

        expect(user).to.have.property('firstName');
        expect(user).to.have.property('lastName');
        expect(user).to.have.property('email');
        expect(user).to.have.property('age');

        done();
      });
  });
});