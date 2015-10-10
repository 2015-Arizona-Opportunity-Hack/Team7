var exports = module.exports;

exports.getAuthHeaders = function(token) {
  return {
    Authorization: 'Bearer ' + token,
    Accept: 'application/json'
  };
};
