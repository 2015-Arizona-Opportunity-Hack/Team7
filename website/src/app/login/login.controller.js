(function() {
  'use strict';

  angular
    .module('website')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, authHelper) {
    var vm = this;

    vm.register = function() {
      auth.register(vm.user).then(function() {
        $state.go('dashboard');
      });
    };

    vm.login = function() {
      vm.error = null;
      authHelper.login(vm.user).then(function() {
        $state.go('dashboard');
      }).catch(function() {
        vm.error = 'Sorry no combination for that email / password';
      });
    };
  }
})();
