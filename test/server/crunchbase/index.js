'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /crunchbase/people', function() {

  xit('should respond with 200', function(done) {
    request(app)
      .get('/api/crunchbase/people')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });


  xit('should have "items" with a "name"', function(done) {
    request(app)
      .get('/api/crunchbase/people')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var parsedBody = res.body;
        parsedBody.data.should.be.instanceof(Object);
        parsedBody.data.should.have.property("items");
        parsedBody.data.items.should.be.instanceof(Array);
        parsedBody.data.items[0].should.have.property("name");

        done();
      });
  });

  xit('if theres more than one page, hit the route for every page', function(done) {
    request(app)
      .get('/api/crunchbase/people')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var parsedBody = res.body;
        parsedBody.data.should.have.property("paging");
        done();
      });
  });
});

