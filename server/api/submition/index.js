'use strict';

var express = require('express');
var controller = require('./submition.controller');
var passport = require('passport');
var router = express.Router();

router.get('/', passport.authenticate('google-id-token', { session: false }), controller.index);
router.get('/:id', passport.authenticate('google-id-token', { session: false }), controller.show);
router.post('/', passport.authenticate('google-id-token', { session: false }), controller.create);
router.put('/:id', passport.authenticate('google-id-token', { session: false }), controller.update);
router.put('/:submitionId/vote', passport.authenticate('google-id-token', { session: false }), controller.vote);
router.patch('/:id', passport.authenticate('google-id-token', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('google-id-token', { session: false }), controller.destroy);

module.exports = router;