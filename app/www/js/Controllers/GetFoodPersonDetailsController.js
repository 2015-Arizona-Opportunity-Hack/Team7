angular.module('starter.controller.getfoodperson', ['starter.factories'])
  .controller('GetFoodPersonDetailsController', function ($scope, eventsArr, eventsObj, dateListObj) {
		console.log("GetFoodPersonDetailsController");

				
		$scope.eventsArr = eventsArr;
		$scope.eventsObj = eventsObj;
		$scope.dateListObj = dateListObj;
		getUserFoodEvents();

		$scope.saveDay = function (day) {
			console.log("saveDay");
			console.log(day);
			console.log('User Food Events', $scope.userFoodEventsObj);
			$scope.userFoodEventsObj.days[day] = day;
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
