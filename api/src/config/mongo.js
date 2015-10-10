'use strict';
var config = { // dev
  user: 'chandler-food-bank',
  pw: 'C1g96PgoAnCrMpklUZ12345',
  db: 'chandler-food-bank',
  host: 'ds035674.mongolab.com',
  port: 35674
};

if (process.env.MONGO_LOCAL === 'true') {
  config.host = '127.0.0.1';
  config.port = 27017;
}
if (process.env.NODE_ENV === 'production') {
  config.host = 'dsXXXXXX.mongolab.com';
  config.port = 27017;
}

var login = config.user ? config.user + ':' + encodeURIComponent(config.pw) + '@' : '';
var uristring = 'mongodb://' + login + config.host + ':' + config.port + '/' + config.db;

module.exports = {
  uristring: uristring,
  config: config
};
