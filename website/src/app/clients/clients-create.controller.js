(function() {
  'use strict';

  angular
    .module('website')
    .controller('ClientsCreateController', ClientsCreateController);

  /** @ngInject */
  function ClientsCreateController($state, chandlerFoodBankApi) {
    var vm = this;

    vm.save = function () {
      chandlerFoodBankApi.clients.create(vm.user).then(function(){
        $state.go('dashboard');
      });
    };
  }
})();
