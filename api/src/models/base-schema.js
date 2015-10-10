'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var BaseSchema = new Schema({
  name: String
});

BaseSchema.virtual('id').get(function(){
  return this._id.toHexString();
}).set(function() {
  this._id = mongoose.Types.ObjectId(this.id);
  return this._id;
});

// Ensure virtual fields are serialised.
BaseSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret, options) {
    delete ret.__t;
    delete ret.__v;
    delete ret._id;
  }
});

module.exports =  BaseSchema;
