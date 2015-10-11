(function () {
  'use strict';

  angular
    .module('website')
    .service('chandlerFoodBankApi', chandlerFoodBankApi);

  /** @ngInject */
  function chandlerFoodBankApi($http) {
    this.login = function (data) {
      return $http.post('/api/login', {
        email: data.email,
        password: data.password
      });
    };

    this.register = function (data) {
      return $http.post('/api/register', {});
    }
  }

  angular
    .module('website')
    .service('userCache', userCache)
    .service('userHttpCache', userHttpCache)
    .service('globalCache', globalCache);

  function userCache(CacheFactory) {
    return CacheFactory('userCache', {
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  }

  function userHttpCache(CacheFactory) {
    return CacheFactory('userHttpCache', {
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  }

  function globalCache(CacheFactory) {
    return CacheFactory('globalCache', {
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  }


})();
