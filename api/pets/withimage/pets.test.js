const app = require('../server');
const request = require('supertest');
const { expect } = require('chai');

describe('Pet Router', () => {
  it('Debería crear una nueva mascota con imagen', (done) => {
    const petData = {
      name: 'Max',
      age: 3,
      image: '/path/to/image.jpg'
    };

    request(app)
      .post('/api/pets/withimage')
      .field('name', petData.name)
      .field('age', petData.age)
      .attach('image', petData.image)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('name', petData.name);
        expect(res.body).to.have.property('age', petData.age);
        expect(res.body).to.have.property('image');

        done();
      });
  });

});