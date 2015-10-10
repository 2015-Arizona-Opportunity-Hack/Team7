(function() {
  'use strict';

  angular
    .module('website')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController() {
    var vm = this;
    vm.profile = {};

    vm.awesomeThings = [{
      name: '1',
      label: 'Help Get Shelter'
    },
      {
        name: '2',
        label: 'Get Food'
      }];

    vm.submit = function(){
      /*
      webService.saveProfile(vm.profile).then(function(){

      })
      */
    }
  }
})();
