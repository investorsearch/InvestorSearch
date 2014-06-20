// 'use strict';

// var should = require('should'),
//     app = require('../../../server'),
//     request = require('supertest');

// describe('GET /crunchbase/people', function() {

//   it('should respond with 200', function(done) {
//     request(app)
//       .get('/api/crunchbase/people')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function(err, res) {
//         if (err) return done(err);
//         //res.body.should.be.instanceof(Object);
//         done();
//       });
//   });

//   it('should respond with an object', function(done) {
//     request(app)
//       .get('/api/crunchbase/people')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function(err, res) {
//         if (err) return done(err);
//         res.body.should.be.instanceof(Object);
//         done();
//       });
//   });
// });