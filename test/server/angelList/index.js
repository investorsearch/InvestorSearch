'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest'),
    sinon = require('sinon'),
    EventEmitter = require('events').EventEmitter;


describe('GET /angelList/companys-investors', function() {
  var sampleId = '6702';

  xit('should respond with an array of investors', function(done) {
    this.timeout(10000);
    request(app)
      .get('/api/angellist/companys-investors/' + sampleId)
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

    //need to figure out how to 'spy' on the looping function, and make sure it is called multiple times on an api call with paginated results

    xit('should loop through all pages of API call', function(done) {
    this.timeout(10000);
    var spy = sinon.spy(),
    emitter = new EventEmitter();

    emitter.on('loopThroughPages', spy);

    request(app)
      .get('/api/angellist/companys-investors/' + sampleId)

      .end(function(err, res) {
        if (err) return done(err);
        spy.called.should.equal.false;
        done();
      });
  });
});

describe('GET /angelList/markets-investors', function() {
  var sampleId = '760';

  xit('should respond with an array of investors', function(done) {
    this.timeout(10000);
    request(app)
      .get('/api/angellist/markets-investors/' + sampleId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var parsedBody = res.body;
        parsedBody.should.be.instanceof(Array);
        parsedBody.forEach(function(user) {
          user.investor.should.equal(true);
        });
        done();
      });
  });
});

describe('GET /api/angellist/coinvestors/:id/:type', function() {
  var sampleId = 5215;
  var sampleType = 'user';

  it('should respond with an array of co-investors', function(done) {
    this.timeout(15000);
    request(app)
      .get('/api/angellist/coinvestors/' + sampleId + '/' + sampleType)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var parsedBody = res.body;
        var investmentCount = 0;
        var isInvestor = 0;
        parsedBody.should.be.instanceof(Array);
        parsedBody.forEach(function(investment) {
          //confirm searched investor exists in list of investors for each startup
          investmentCount++;
          investment.forEach(function(investor){
            console.log('investors id:' + investor.tagged.id);
            if(investor.tagged.id === sampleId) {
              isInvestor++;
            }
          });
        });
        console.log('investmentCount: ' + investmentCount);
        console.log('isInvestor: ' + isInvestor);
        investmentCount.should.equal(isInvestor);
        done();
      });
  });
});
