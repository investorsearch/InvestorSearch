'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /crunchbase/people', function() {

  xit('should respond with 200', function(done) {
    this.timeout(10000);
    request(app)
      .get('/api/crunchbase/people')
      .expect(200)
      //.expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });


  xit('should have "items" with a "name"', function(done) {
    this.timeout(10000);
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

  xit('check to see if it has pages', function(done) {
    this.timeout(10000);
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


describe('GET /crunchbase/person', function() {

  it('should respond with 200', function(done) {
    request(app)
      .get('/api/crunchbase/person')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });


  it('should return an object', function(done) {
    request(app)
      .get('/api/crunchbase/person')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('should return an object with investments', function(done) {
    var name = "Marc";
    request(app)
      .get('/api/crunchbase/person')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property("paging");
        res.body.should.have.property("items");
        done();
      });
  });
});




