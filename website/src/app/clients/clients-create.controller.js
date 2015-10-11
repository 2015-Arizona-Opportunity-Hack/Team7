(function() {
  'use strict';

  angular
    .module('website')
    .controller('ClientsCreateController', ClientsCreateController);

  /** @ngInject */
  function ClientsCreateController() {
    var vm = this;

    vm.save = function (chandlerFoodBankApi) {
      chandlerFoodBankApi.clients.create(vm.clients);

    };
  }
})();
