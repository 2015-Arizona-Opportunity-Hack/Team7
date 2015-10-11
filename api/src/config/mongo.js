'use strict';
var config = { // dev
  user: 'chandler-food-bank',
  pw: 'C1g96PgoAnCrMpklUZ12345',
  db: 'chandler-food-bank',
  host: 'ds035674.mongolab.com',
  port: 35674
};

var login = config.user ? config.user + ':' + encodeURIComponent(config.pw) + '@' : '';
var uristring = 'mongodb://' + login + config.host + ':' + config.port + '/' + config.db;

module.exports = {
  uristring: uristring,
  config: config
};
