'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest'),
    sinon = require('sinon'),
    EventEmitter = require('events').EventEmitter;


describe('GET /angelList/getinvestors', function() {
  var sampleId = '6702';
  xit('should respond with 200', function(done) {
    //paginated results make take longer
    this.timeout(10000);
    request(app)
      .get('/api/angellist/getinvestors/' + sampleId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  xit('should respond with an array of investors', function(done) {
    this.timeout(10000);
    request(app)
      .get('/api/angellist/getinvestors/' + sampleId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var parsedBody = res.body;
        parsedBody.should.be.instanceof(Array);
        parsedBody.forEach(function(user) {
          user.role.should.equal("past_investor");
        });
        done();
      });
  });

    it('should loop through all pages of API call', function(done) {
    this.timeout(10000);
    var spy = sinon.spy(),
    emitter = new EventEmitter;

    emitter.on('loopThroughPages', spy);

    request(app)
      .get('/api/angellist/getinvestors/' + sampleId)

      .end(function(err, res) {
        if (err) return done(err);
        spy.called.should.equal.true;
        done();
      });
  });


});