/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var cors = require('cors');
var passport = require('passport');
var GoogleTokenStrategy = require('passport-google-id-token');
var User = require('../api/user/user.model');

module.exports = function (app) {
  var env = app.get('env');

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(cors());
  app.disable('etag');

  passport.use(new GoogleTokenStrategy({
    clientID: "587152662839-vr7o37jcpn6ora2llurkdo07u75ne5vl.apps.googleusercontent.com",
    clientSecret: "aj97pc2EkaAckmE8_mbgyYvt",
    passReqToCallback: true
  },
    function (req, profile, sub, done) {
      let userDoc = { provider: "Google", sub: sub, email: profile.payload.email, name: profile.payload.name };
      User.findOneAndUpdate({ email: profile.payload.email }, userDoc, { upsert: true, new: true }, function (err, user) {
        return done(err, user._doc);
      });
    }
  ));

  // passport.serializeUser(function (user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function (user, done) {
  //   User.findById(user._id, function (err, user) {
  //     done(err, user);
  //   });
  // });

  if ('production' === env) {
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};