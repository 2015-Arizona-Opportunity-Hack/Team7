(function () {
  'use strict';

  angular
    .module('website')
    .service('chandlerFoodBankApi', chandlerFoodBankApi);

  /** @ngInject */
  function chandlerFoodBankApi($http) {
    this.login = function (data) {
      return $http.post('/api/login', data);
    };

    this.register = function (data) {
      return $http.post('/api/register', data);
    };

    this.events = {
      getAll: function () {
        return $http.get('/api/events');
      },
      create: function (data) {
        return $http.post('/api/events', data);
      },
      get: function (id) {
        return $http.get('/api/events/' + id);
      }
    };
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
