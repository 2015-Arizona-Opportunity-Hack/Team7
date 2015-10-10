'use strict';

module.exports = function() {
  var mongoose = require('mongoose'),
    extendSchema = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    BaseSchema = require('../base-schema.js'),
    ObjectId = Schema.ObjectId;

  var fields = {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  };

  var eventsSchema = BaseSchema.extend(fields, {strict: false});
  mongoose.model('Events', eventsSchema, 'events');
};
