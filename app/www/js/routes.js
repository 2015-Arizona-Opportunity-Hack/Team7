angular.module('starter.routes', [])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'AppController'
			})

			.state('app.communityactionprogram', {
				url: '/communityactionprogram',
				views: {
					'menuContent': {
						templateUrl: 'templates/community_action_program/community_action_program.html'
					}
				}
			})
			.state('app.familyresourcecenter', {
				url: '/familyresourcecenter',
				views: {
					'menuContent': {
						templateUrl: 'templates/familyresourcecenter/familyresourcecenter.html'
					}
				}
			})
			.state('app.ihelp', {
				url: '/ihelp',
				views: {
					'menuContent': {
						templateUrl: 'templates/ihelp/ihelp.html'
					}
				}
			})
			.state('app.foodbank', {
				url: '/foodbank',
				views: {
					'menuContent': {
						templateUrl: 'templates/food_bank/food_bank_details.html'
					}
				}				
			})
			.state('app.seniorcenter', {
				url: '/seniorcenter',
				views: {
					'menuContent': {
						templateUrl: 'templates/senior_center/senior_center.html'
					}
				}				
			})
			.state('app.foodbankpersondetails', {
				url: '/foodbankpersondetails',
				views: {
					'menuContent': {
						templateUrl: 'templates/food_bank/food_bank_person_details.html',
						controller: 'FoodBankPersonDetailsController',
						resolve: {
							eventsArr: function (events) {
								return events.all();
							},
							eventsObj: function (eventsArr, eventsHelper) {
								return eventsHelper.convertToDateMappedObj(eventsArr);
							},
							dateListObj: function (eventsHelper) {
								return eventsHelper.getDateList();
							}
						}
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
		
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/home');
	});
