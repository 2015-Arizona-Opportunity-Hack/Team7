angular.module('starter.controller.getfoodperson', ['starter.factories'])
  .controller('GetFoodPersonDetailsController', function ($scope, eventsArr, eventsObj) {

	console.log("GetFoodPersonDetailsController");
	
	$scope.eventsArr = eventsArr;
	$scope.eventsObj = eventsObj;	  
});
