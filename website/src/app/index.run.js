(function() {
  'use strict';

  angular
    .module('website')
    .run(routeSecurity)
    .run(runBlock);

  /** @ngInject */
  function routeSecurity($rootScope, $state, jwtHelper, userCache) {
    $rootScope.$on('$stateChangeStart', function(e, toState) {
      if (toState.data && toState.data.requiresLogin) {
        var jwt = userCache.get('jwt');
        if (!jwt || jwtHelper.isTokenExpired(jwt)) {
          e.preventDefault();
          if (toState.resolve) {
            // Stop spinner
          }
          $state.go('login');
        }
      }
    });

    $rootScope.$on('$stateChangeStart', function(e, toState) {
      if (toState && toState.resolve) {
        // Start spinner
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(e, toState) {
      if (toState && toState.resolve) {
        // Stop spinner
      }
    });

    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState) {
      if (toState && toState.resolve) {
        // Stop spinner
      }

      if (fromState.data && fromState.data.requiresLogin) {
        var jwt = userCache.get('jwt');
        if (!jwt || jwtHelper.isTokenExpired(jwt)) {
          $state.go('login');
        }
      }
    });
  }

  /** @ngInject */
  function runBlock($rootScope, $log) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      $log.error('Failed to change state');
      $log.error(event, toState, toParams, fromState, fromParams, error);
    });
  }
})();
