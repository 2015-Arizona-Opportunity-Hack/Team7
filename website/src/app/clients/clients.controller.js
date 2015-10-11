(function() {
  'use strict';

  angular
    .module('website')
    .controller('ClientsController', ClientsController);

  /** @ngInject */
  function ClientsController(calendarEvents) {
    var vm = this;

    vm.calendarConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        }
      }
    };

    vm.allClients = [calendarEvents];

  }
})();
