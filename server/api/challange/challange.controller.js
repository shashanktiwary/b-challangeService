/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /challanges              ->  index
 * GET     /challanges/current      ->  indexCurrent
 * POST    /challanges              ->  create
 * GET     /challanges/:id          ->  show
 * PUT     /challanges/:id          ->  update
 * DELETE  /challanges/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Challange = require('./challange.model');
var Submition = require('../submition/submition.model');

// Get list of open challanges
exports.index = function (req, res) {
  let query = { userId: req.user._id };
  Submition.find(query)
    .select("challangeId")
    .exec(function (err, ids) {
      if (err) { return handleError(res, err); }

      let challangesIds = (ids || []).map(function (v) { return v._doc.challangeId; });
      let openChallanges = {
        published: true,
        closed: false,
        active: true,
        _id: { $nin: challangesIds }
      };

      Challange.find(openChallanges, function (err, challanges) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(challanges);
      });

    });
};

// Get list of current challanges
exports.indexCurrent = function (req, res) {
  let query = { userId: req.user._id };
  Submition.find(query)
    .select("challangeId")
    .exec(function (err, ids) {
      if (err) { return handleError(res, err); }

      let challangesIds = (ids || []).map(function (v) { return v._doc.challangeId; });
      let openChallanges = {
        published: true,
        closed: false,
        active: true,
        _id: { $in: challangesIds }
      };

      Challange.find(openChallanges, function (err, challanges) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(challanges);
      });

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