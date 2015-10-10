'use strict';

var mongoose = require('mongoose'),
_ = require('lodash'),
jwt = require('express-jwt'),
secret = require('./secret');

/**
 * Generic require login routing middleware
 */
exports.jwtCheck = jwt({
  secret: secret.secretToken
});

exports.isAdmin = function(req, res, next) {
  return res.status(500).json({message: 'None shall pass...'});
};

/**
 * Generic validates if the first parameter is a mongo ObjectId
 */
exports.isMongoId = function(req, res, next) {
  if ((_.size(req.params) === 1) && (!mongoose.Types.ObjectId.isValid(_.values(req.params)[0]))) {
    return res.status(500).json({message: 'Parameter passed is not a valid Mongo ObjectId'});
  }
  next();
};
