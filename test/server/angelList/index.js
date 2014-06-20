'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /angelList/getinvestors', function() {
  var sampleId = '6702';
  it('should respond with 200', function(done) {
    request(app)
      .get('/api/angellist/getinvestors/' + sampleId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should respond with an object', function(done) {
    request(app)
      .get('/api/angellist/getinvestors/' + sampleId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});