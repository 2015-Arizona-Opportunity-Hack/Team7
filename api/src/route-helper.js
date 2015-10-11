'use strict';

var routeHelper = {};

routeHelper.isAdmin = function(user) {
  return !!(user && user.role && user.role === 'admin');
};

routeHelper.isEmployee = function(user) {
  return !!(user && user.role && user.role === 'employee');
};

routeHelper.isEmployeeOrAdmin = function(user) {
  return !!(user && user.role && (user.role === 'admin' || user.role === 'employee'));
};

routeHelper.isUser = function(user,id){
  return !!(user && user.id && user.id === id);
};

routeHelper.idMatches = function(data,id) {
  return data.id === id;
};

module.exports = routeHelper;
