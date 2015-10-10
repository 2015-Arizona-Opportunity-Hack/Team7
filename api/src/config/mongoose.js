'use strict';
var mongoose = require('mongoose');
var mongo = require('./mongo');

var mongoOptions = {db: {safe: true}};
mongoose.connect(mongo.uristring, mongoOptions, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + mongo.uristring + '. ' + err);
  } else {
    console.log('Successfully connected to: ' + mongo.uristring);
  }
});

exports.mongoose = mongoose;
