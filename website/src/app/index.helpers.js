(function () {
  'use strict';

  angular
    .module('website')
    .service('authHelper', authHelper);

  /** @ngInject */
  function authHelper($rootScope, $q, userCache, userHttpCache, chandlerFoodBankApi) {
    var storeSession = function (res) {
      try {
        userCache.put('user', res.data);
        userCache.put('jwt', res.meta.jwt);
        $rootScope.user = res.data;
        return null;
      } catch (err) {
        return $q.reject('unable to save the user to local storage!');
      }
    };

    this.login = function (data) {
      this.logout();
      return chandlerFoodBankApi.login(data).then(storeSession);
    };

    this.registerAndLogin = function (data) {
      this.logout();
      return chandlerFoodBankApi.register(data).then(storeSession);
    };

    this.logout = function () {
      // Note don't clear global caches, as they don't contain user specific data.
      userHttpCache.removeAll();
      userCache.removeAll();
    };
  }

  angular
    .module('website')
    .service('eventsHelper', eventsHelper);

  /** @ngInject */
  function eventsHelper() {
    this.eventsToCalendarEvents = function (events) {

      var calendarEvents = [];

      for (var i in events) {
        calendarEvents.push({
          title: events[i].name || null,
          start: events[i].date && events[i].date.start || null,
          end: events[i].date && events[i].date.end || null
        });
      }

      return calendarEvents;
    };
  }
})();
