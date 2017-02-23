'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ChallangeSchema = new Schema({
  noteId: Schema.Types.ObjectId,
  openedOn: Date,
  closedOn: Date,
  Published: Boolean,
  Closed: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Challange', ChallangeSchema);