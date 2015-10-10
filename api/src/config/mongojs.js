'use strict';
var mongojs = require('mongojs'),
  mongo = require('./mongo');

module.exports = mongojs(mongo.uristring);
