const app = require('../server');
const request = require('supertest');

describe('Pet Router', () => {
  it('should create a new pet with image', (done) => {
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
        done();
      });
  });

});