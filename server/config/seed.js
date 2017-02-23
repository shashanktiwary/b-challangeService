/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Challange = require('../api/challange/challange.model');
var User = require('../api/user/user.model');

// Insert seed data below
var challangeSeed = require('../api/challange/challange.seed.json');

// Insert seed inserts below
Challange.find({}).remove(function() {
  Challange.create(challangeSeed);
});