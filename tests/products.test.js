const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

describe('Products Router', () => {
  it('Should return all products', (done) => {
    request(app)
      .get('/api/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

});