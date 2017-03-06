'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/challanges', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/challanges')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
