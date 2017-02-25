'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ChallangeSchema = new Schema({
  title: String,
  openedOn: Date,
  closedOn: Date,
  published: Boolean,
  closed: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Challange', ChallangeSchema);