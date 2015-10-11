'use strict';

module.exports = function () {
  var mongoose = require('mongoose'),
    extendSchema = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    BaseSchema = require('../base-schema.js'),
    ObjectId = Schema.ObjectId;

  var fields = {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['FOOD', 'TUTOR']
    },
    date: {
      start: {
        type: Date,
        required: true
      },
      end: {
        type: Date,
        required: true
      }
    },
    locations: [
      BaseSchema.extend({
        name: {
          type: String,
          required: true
        },
        address1: {
          type: String,
          required: true
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        zip: {
          type: String,
          required: true
        },
        loc:  {type: [Number], index: '2d', required: true}
      }, {strict: true})
    ]
  };

  var eventsSchema = BaseSchema.extend(fields, {strict: false});
  mongoose.model('Events', eventsSchema, 'events');
};
