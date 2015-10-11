angular.module('starter.controller.getfoodperson', ['starter.factories'])
  .controller('GetFoodPersonDetailsController', function ($scope, eventsArr, eventsObj, dateListObj, $cordovaLocalNotification, $ionicModal) {
		console.log("GetFoodPersonDetailsController");

				
		$scope.eventsArr = eventsArr;
		$scope.eventsObj = eventsObj;
		$scope.dateListObj = dateListObj;
		getUserFoodEvents();


		$ionicModal.fromTemplateUrl('templates/getfood/getfoodeventdetails.html', function(modal) {
			$scope.eventDetailsModal = modal;
			}, {
				scope: $scope
			});
			
		$scope.showEventDetailsModal = function (week, day, selectedEvent) {
			$scope.selectedEvent = selectedEvent;
			$scope.selectedWeek = week;
			$scope.selectedDay = day;
			if ($scope.userFoodEventsObj.days[$scope.selectedWeek.end].date == $scope.selectedDay || $scope.userFoodEventsObj.days[$scope.selectedWeek.start].date == $scope.selectedDay) {
				$scope.saveButtonText = "Remove";
			} else {
				$scope.saveButtonText = "Save";
			}
			
			if ($scope.userFoodEventsObj.days[$scope.selectedWeek.end].date == $scope.selectedDay) {
				$scope.selectedEvent.remindMe = $scope.userFoodEventsObj.days[$scope.selectedWeek.end].remindMe;
			} else if ($scope.userFoodEventsObj.days[$scope.selectedWeek.start].date == $scope.selectedDay) {
				 $scope.selectedEvent.remindMe = $scope.userFoodEventsObj.days[$scope.selectedWeek.start].remindMe;
			} else {
				$scope.selectedEvent.remindMe = false;
			}
			console.log('showEventDetailsModal.remindMe', $scope.selectedEvent.remindMe);
			$scope.eventDetailsModal.show();
		}
		
		$scope.closeEventDetailsModal = function () {
			$scope.eventDetailsModal.hide();
		}
		
		$scope.saveDay = function () {
			var remindMe = $scope.selectedEvent.remindMe === undefined ? false : $scope.selectedEvent.remindMe;	 
			var end = moment($scope.selectedWeek.start, 'YYYY-M-D').add('d', 4);
			var dayFormatted = moment($scope.selectedDay, 'YYYY-M-D');
			if (end.isSame(dayFormatted)) {
				console.log('isFriday');	
				if ($scope.userFoodEventsObj.days[$scope.selectedWeek.end]) {
					$scope.userFoodEventsObj.days[$scope.selectedWeek.end] = null
					delete $scope.userFoodEventsObj.days[$scope.selectedWeek.end];
				} else {
					$scope.userFoodEventsObj.days[$scope.selectedWeek.end] = {
						'date': $scope.selectedDay,
						'remindMe': remindMe
					};
				}						
			} else {
				console.log('is Not Friday');
				if ($scope.userFoodEventsObj.days[$scope.selectedWeek.start] == $scope.selectedDay) {
					$scope.userFoodEventsObj.days[$scope.selectedWeek.start] = null
					delete $scope.userFoodEventsObj.days[$scope.selectedWeek.start];
				} else {
					$scope.userFoodEventsObj.days[$scope.selectedWeek.start] =
					{
						'date': $scope.selectedDay,
						'remindMe': remindMe
					};
				}
			}
			
			window.localStorage['foodEvents'] = angular.toJson($scope.userFoodEventsObj);
			
			if (ionic.Platform.isWebView()) {
				if (remindMe) {
					scheduleNotification(event)
				} else {
					removeNotification(event);
				}
			} 				
			
			$scope.eventDetailsModal.hide();
		}
		
		function scheduleNotification(event) {			
			// var alarmTime = moment.utc(event.date.start).toDate();
			// var name = alarmTime.format('YYYY-M-D');
			
			//DEBUG ONLY
			var alarmTime = new Date();
			alarmTime.setSeconds(alarmTime.getSeconds() + 5);
			var name = moment(alarmTime, 'YYYY-M-D').format('YYYY-M-D');
			
			$cordovaLocalNotification.schedule({
				id: name,
				date: alarmTime,
				message: event.description,
				title: event.name,
				autoCancel: false,
				sound: null
			}).then(function () {
				console.log("The notification has been set");
			});
		}
		
		
		function removeNotification(event) {
			// var alarmTime = moment.utc(event.date.start).toDate();
			// var name = alarmTime.format('YYYY-M-D');
			
			//DEBUG ONLY
			var alarmTime = new Date();
			alarmTime.setSeconds(alarmTime.getSeconds() + 5);
			var name = moment(alarmTime, 'YYYY-M-D').format('YYYY-M-D');			

			$cordovaLocalNotification.cancel(name);
			console.log('the notification has been removed');
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
