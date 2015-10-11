(function () {
  'use strict';

  angular
    .module('website')
    .service('chandlerFoodBankApi', chandlerFoodBankApi);

  /** @ngInject */
  function chandlerFoodBankApi($http) {
    this.login = function (data) {
      return $http.post('https://limitless-chamber-3620.herokuapp.com/api/login', data);
    };

    this.register = function (data) {
      return $http.post('https://limitless-chamber-3620.herokuapp.com/api/register', data);
    };

    this.events = {
      getAll: function () {
        return $http.get('https://limitless-chamber-3620.herokuapp.com/api/events');
      },
      create: function (data) {
        return $http.post('https://limitless-chamber-3620.herokuapp.com/api/events', data);
      },
      get: function (id) {
        return $http.get('https://limitless-chamber-3620.herokuapp.com/api/events/' + id);
      }
    };

    this.clients = {
      getAll: function () {
        return $http.get('https://limitless-chamber-3620.herokuapp.com/api/users', {
          params: {role: 'user'}
        });
      },
      create: function (data) {
        return $http.post('https://limitless-chamber-3620.herokuapp.com/api/users', angular.extend({}, data, {role: 'user'}));
      }
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
