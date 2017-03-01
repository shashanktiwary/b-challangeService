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

// Get list of submitions
exports.index = function(req, res) {
  Submition.find(function (err, submitions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(submitions);
  });
};

// Get a single submition
exports.show = function(req, res) {
  Submition.findById(req.params.id, function (err, submition) {
    if(err) { return handleError(res, err); }
    if(!submition) { return res.status(404).send('Not Found'); }
    return res.json(submition);
  });
};

// Creates a new submition in the DB.
exports.create = function(req, res) {
  // challangeId: Schema.Types.ObjectId,
  //   userId: Schema.Types.ObjectId,
  //   notes: { [ title: String, note: String ] },
  //   submitted: Boolean,
  //   SubmittedOn: Date
  Submition.create(req.body, function(err, submition) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(submition);
  });
};

// Updates an existing submition in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Submition.findById(req.params.id, function (err, submition) {
    if (err) { return handleError(res, err); }
    if(!submition) { return res.status(404).send('Not Found'); }
    var updated = _.merge(submition, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(submition);
    });
  });
};

// Deletes a submition from the DB.
exports.destroy = function(req, res) {
  Submition.findById(req.params.id, function (err, submition) {
    if(err) { return handleError(res, err); }
    if(!submition) { return res.status(404).send('Not Found'); }
    submition.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}