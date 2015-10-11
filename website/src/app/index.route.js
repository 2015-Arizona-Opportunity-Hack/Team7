(function () {
  'use strict';

  angular
    .module('website')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/templates/main.html'
      })
      .state('home', {
        parent: 'main',
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('foodbank', {
        parent: 'main',
        url: '/foodbank',
        templateUrl: 'app/foodbank/foodbank.html'
      })
      .state('family', {
        parent: 'main',
        url: '/family',
        templateUrl: 'app/family/family.html'
      })
      .state('community', {
        parent: 'main',
        url: '/community',
        templateUrl: 'app/community/community.html'
      })
      .state('ihelp', {
        parent: 'main',
        url: '/ihelp',
        templateUrl: 'app/ihelp/ihelp.html'
      })
      .state('seniors', {
        parent: 'main',
        url: '/seniors',
        templateUrl: 'app/seniors/seniors.html'
      })
      .state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: 'app/templates/admin.html'
      })
      .state('dashboard', {
        parent: 'admin',
        data: {requiresLogin: true},
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html'
      })
      .state('events', {
        abstract: true,
        parent: 'admin',
        url: '/events',
        template: '<div ui-view></div>'
      })
      .state('events.list', {
        data: {requiresLogin: true},
        url: '/events',
        templateUrl: 'app/events/events.html',
        controller: 'EventsController',
        controllerAs: 'events',
        resolve: {
          allEvents: function (chandlerFoodBankApi) {
            try {
              return chandlerFoodBankApi.events.getAll().then(function (res) {
                return res.data;
              });
            } catch (err) {
              console.log('err', err);
            }
          },
          calendarEvents: function (allEvents, eventsHelper) {
            return eventsHelper.eventsToCalendarEvents(allEvents);
          }
        }
      })
      .state('clients',{
        parent: 'admin',
        abstract: true,
        url: '/clients',
        template: '<div ui-view></div>'
      })

      .state('clients.create',{
        url: '/create',
        templateUrl: 'app/clients/clients-create.html',
        controller: 'ClientsCreateController',
        controllerAs: 'clients'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/logout/logout.html',
        resolve: {
          logout: function (authHelper) {
            return authHelper.logout();
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
