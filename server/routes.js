/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/challanges', require('./api/challange'));
  app.use('api/submitions', require('./api/submition'));

  // app.use('/api/users', require('./api/user'));
  // app.use('/auth', require('./auth'));
  

};
