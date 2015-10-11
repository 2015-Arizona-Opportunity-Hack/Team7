(function() {
  'use strict';

  angular
    .module('website')
    .service('authHelper', authHelper);

  /** @ngInject */
  function authHelper($q, userCache, userHttpCache, chandlerFoodBankApi) {
    var storeSession = function(res) {
      try {
        userCache.put('user', res.data);
        userCache.put('jwt', res.meta.jwt);
        return null;
      } catch (err) {
        return $q.reject('unable to save the user to local storage!');
      }
    };

    this.login = function(data) {
      this.logout();
      return chandlerFoodBankApi.login(data).then(storeSession);
    };

    this.registerAndLogin = function(data) {
      this.logout();
      return chandlerFoodBankApi.register(data).then(storeSession);
    };

    this.logout = function() {
      // Note don't clear global caches, as they don't contain user specific data.
      userHttpCache.removeAll();
      userCache.removeAll();
    };
  }

})();
