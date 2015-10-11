(function() {
  'use strict';

  angular
    .module('website')
    .controller('EventsCreateController', EventsCreateController);

  /** @ngInject */
  function EventsCreateController() {
    var vm = this;

    vm.save = function (chandlerFoodBankApi) {
      chandlerFoodBankApi.events.create(vm.event);

    };
  }
})();
