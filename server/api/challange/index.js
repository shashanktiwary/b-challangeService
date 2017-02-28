'use strict';

var express = require('express');
var controller = require('./challange.controller');
var passport = require('passport');

var router = express.Router();

router.get('/', passport.authenticate('google-id-token'), controller.index);
router.get('/:id', passport.authenticate('google-id-token'), controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;