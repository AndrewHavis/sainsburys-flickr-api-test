'use strict';

// Import Express
var express = require('express');
var app = express();

// Assign the root of this app to the ./app directory
app.use('/', express.static(__dirname + '/app'));

// Assign /test to our unit tests
app.use('/test', express.static(__dirname + '/test'));

// Get our Bower libraries
app.use('/lib', express.static(__dirname + '/bower_components'));

// Now start our server on port 8595
app.listen(8595, '0.0.0.0', function () {
    console.log('Server started on port 8595');
});
