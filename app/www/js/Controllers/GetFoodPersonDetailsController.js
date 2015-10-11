angular.module('starter.controller.getfoodperson', ['starter.factories'])
  .controller('GetFoodPersonDetailsController', function ($scope, eventsArr, eventsObj, dateListObj) {
		console.log("GetFoodPersonDetailsController");

				
		$scope.eventsArr = eventsArr;
		$scope.eventsObj = eventsObj;
		$scope.dateListObj = dateListObj;
		getUserFoodEvents();

		$scope.saveDay = function (week, day) {
			var end = moment(week.start, 'M-D-YYYY').add('d', 4);
			var dayFormatted = moment(day, 'YYYY-M-D');
			
			if (end.isSame(dayFormatted)) {
				console.log('isFriday');	
				if ($scope.userFoodEventsObj.days[week.end]) {
					console.log('d');
					$scope.userFoodEventsObj.days[week.end] = null
					delete $scope.userFoodEventsObj.days[week.end];
				} else {
					$scope.userFoodEventsObj.days[week.end] = day;	
				}						
			} else {
				console.log('is Not Friday');
				if ($scope.userFoodEventsObj.days[week.start]) {
					$scope.userFoodEventsObj.days[week.start] = null
					delete $scope.userFoodEventsObj.days[week.start];
				} else {
					$scope.userFoodEventsObj.days[week.start] = day;	
				}
			}
			
			window.localStorage['foodEvents'] = angular.toJson($scope.userFoodEventsObj); 				
		}
		
		function getUserFoodEvents() {
			console.log('getUserFoodEvents');
			var foodEventsString = window.localStorage['foodEvents'];
			if (foodEventsString) {
				console.log('got data');
				$scope.userFoodEventsObj = angular.fromJson(foodEventsString);			 				
			}
			else
			{
				console.log('no data');
				$scope.userFoodEventsObj = {
					'days': {}
				};
				
				
			}
		}
});
