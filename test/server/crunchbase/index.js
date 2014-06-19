'use strict';

var should = require('should'),
    crunchbase = require('../../../crunchbase'),
    request = require('supertest');

//crunchbase route for investors go here
describe('GET /api/awesomeThings', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/awesomeThings')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
