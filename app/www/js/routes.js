angular.module('starter.routes', [])
	.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppController'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
	  .state('app.getfoodpersondetails', {
		  url: '/getfooddetails',
		  views: {
			  'menuContent': {
				  templateUrl: 'templates/getfood/getfoodpersondetails.html',
				  controller: 'GetFoodPersonDetailsController'
			  }
		  }
	  })
  
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
        }
      }
    })
	  .state('app.getfoodeventdetails', {
		  url: '/getfoodeventdetails/:id',
		  views: {
			  'menuContent': {
				  templateUrl: 'templates/getfood/getfoodeventdetails.html',
				  controller: 'GetFoodEventDetailsController'
				  
				
			}
		}
	  });
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
