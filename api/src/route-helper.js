'use strict';

var routeHelper = {};

routeHelper.isAdmin = function(user) {
  return !!(user && user.role && user.role === 'admin');
};

routeHelper.isUser = function(user,id){
  return !!(user && user.id && user.id === id);
};

routeHelper.idMatches = function(data,id) {
  return data.id === id;
};

module.exports = routeHelper;
