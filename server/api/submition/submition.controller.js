/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /submitions              ->  index
 * POST    /submitions              ->  create
 * GET     /submitions/:id          ->  show
 * PUT     /submitions/:id          ->  update
 * DELETE  /submitions/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Submition = require('./submition.model');
var mongoose = require('mongoose');

// Get list of submitions
exports.index = function (req, res) {
  Submition.find(function (err, submitions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(submitions);
  });
};

// Get a single submition
exports.show = function (req, res) {
  Submition.findById(req.params.id, function (err, submition) {
    if (err) { return handleError(res, err); }
    if (!submition) { return res.status(404).send('Not Found'); }
    return res.json(submition);
  });
};

// Creates a new submition in the DB.
exports.create = function (req, res) {

  let submition = {
    challangeId: req.body.challangeId,
    userId: req.user._id,
    submitted: true,
    SubmittedOn: new Date()
  };

  submition.notes = new Array();
  for (let i = 0; i < req.body.notes.length; i++) {
    submition.notes.push({ title: req.body.notes[i].title, note: req.body.notes[i].note, voteCount: 0 });
  }

  Submition.create(submition, function (err, submition) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(submition);
  });
};

// Updates an existing submition in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Submition.findById(req.params.id, function (err, submition) {
    if (err) { return handleError(res, err); }
    if (!submition) { return res.status(404).send('Not Found'); }
    var updated = _.merge(submition, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(submition);
    });
  });
};

exports.vote = function (req, res) {
  var noteId = new mongoose.Types.ObjectId(req.body.id)
  var query = {
    _id: new mongoose.Types.ObjectId(req.params.submitionId),
    "notes._id": noteId
  };

  var updateState = {
    $addToSet: { "votes": { noteId: noteId, userId: req.user._id, power: 1 } }, $inc: { "notes.$.voteCount": 1 },
    $addToSet: { "notes.$.voted": req.user._id }
  };

  Submition.update(query, updateState, function (err, doc) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(doc);
  });

}

// Deletes a submition from the DB.
exports.destroy = function (req, res) {
  Submition.findById(req.params.id, function (err, submition) {
    if (err) { return handleError(res, err); }
    if (!submition) { return res.status(404).send('Not Found'); }
    submition.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}