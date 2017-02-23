/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /challanges              ->  index
 * POST    /challanges              ->  create
 * GET     /challanges/:id          ->  show
 * PUT     /challanges/:id          ->  update
 * DELETE  /challanges/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Challange = require('./challange.model');

// Get list of challanges
exports.index = function (req, res) {
  Challange.find(function (err, challanges) {
    if (err) { return handleError(res, err); }
    return res.status(200).json([
      {
        id: 'abcd',
        openDate: new Date(),
        title: 'Hello world'
      },
      {
        id: 'ab',
        openDate: new Date(),
        title: 'Hi there!'
      }
    ]);
  });
};

// Get a single challange
exports.show = function (req, res) {
  Challange.findById(req.params.id, function (err, challange) {
    if (err) { return handleError(res, err); }
    if (!challange) { return res.status(404).send('Not Found'); }
    return res.json(challange);
  });
};

// Creates a new challange in the DB.
exports.create = function (req, res) {
  Challange.create(req.body, function (err, challange) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(challange);
  });
};

// Updates an existing challange in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Challange.findById(req.params.id, function (err, challange) {
    if (err) { return handleError(res, err); }
    if (!challange) { return res.status(404).send('Not Found'); }
    var updated = _.merge(challange, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(challange);
    });
  });
};

// Deletes a challange from the DB.
exports.destroy = function (req, res) {
  Challange.findById(req.params.id, function (err, challange) {
    if (err) { return handleError(res, err); }
    if (!challange) { return res.status(404).send('Not Found'); }
    challange.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}