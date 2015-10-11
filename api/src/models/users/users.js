'use strict';

module.exports = function() {
  var mongoose = require('mongoose'),
    extendSchema = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    BaseSchema = require('../base-schema.js'),
    ObjectId = Schema.ObjectId,
    crypto = require('crypto'),
    _ = require('lodash');

  var validatePresenceOf = function(value) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    return (this.provider && this.provider !== 'local') || (value && value.length);
  };

  var fields = {
    firstName: {
      type: String,
      required: true,
      get: _.escape
    },
    lastName: {
      type: String,
      required: true,
      get: _.escape
    },
    phoneNumber: {
      type: String,
      //required: true,
      get: _.escape
    },
    email: {
      type: String,
      required: true,
      match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    role: {
      type: String,
      enum: ['admin','employee','user'],
      default: 'user'
    },
    hashedPassword: {
      type: String,
      validate: [validatePresenceOf, 'Password cannot be blank']
    },
    salt: String,
    reset: {
      toke: String,
      Expires: Date
    },
    created: {
      type: Date,
      default: Date.now,
      required: true
    }
  };

  var UsersSchema = BaseSchema.extend(fields, {strict: true});

  UsersSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.hashPassword(password);
  }).get(function() {
    return this._password;
  });

  UsersSchema.methods = {
    authenticate: function(plainText) {
      return this.hashPassword(plainText) === this.hashedPassword;
    },
    makeSalt: function() {
      return crypto.randomBytes(16).toString('base64');
    },
    hashPassword: function(password) {
      if (!password || !this.salt) return '';
      var salt = new Buffer(this.salt, 'base64');
      return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
  };

  UsersSchema.set('toJSON', {
    transform: function(doc, ret, options) {
      delete ret.password;
      delete ret.hashedPassword;
      delete ret.salt;
      delete ret.reset;
      delete ret.provider;
      delete ret.__t;
      delete ret.__v;
      delete ret._id;
    }
  });

  mongoose.model('Users', UsersSchema, 'users');
};
