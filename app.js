'use strict';

// Import Express
const express = require('express');
const app = express();

// Assign the root of this app to the ./app directory
app.use('/', express.static(__dirname + '/app'));

// Get our Bower libraries
app.use('/lib', express.static(__dirname + '/bower_components'));

// Now start our server on port 8595
app.listen(8595, '0.0.0.0', () => {
    console.log('Server started on port 8595');
});
