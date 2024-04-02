const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

describe('Carts Router', () => {
  it('Debería crear un nuevo carrito', (done) => {
    request(app)
      .post('/api/carts')
      .send({ })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

});