	angular.module('starter.factories', [])
.factory('events', function ($http, $q) {
		var service = {
			all: all,
		};
		
		var events = [];
		
		var eventsFromDbHardCoded = [
			{
				name: 'Food',
				type: 'FOOD',
				date: {
				start: '2015-10-12T15:00:00.000Z',
				end: '2015-10-13T00:00:00.000Z'
				},
				description: 'Pickup Food',
				picture: '',
				locations: [
				{
					name: 'Walgreens',
					address1: 'address 1',
					address2: 'address 2',
					city: 'city',
					state: 'az',
					zip: '99999',
					coordinates: ['', ''] // lng, lat
				}
				]
				},
			{
				name: 'Food',
				type: 'FOOD',
				date: {
				start: '2015-10-13T15:00:00.000Z',
				end: '2015-10-14T00:00:00.000Z'
				},
				description: 'Pickup Food',
				picture: '',
				locations: [
				{
					name: 'Walgreens',
					address1: 'address 1',
					address2: 'address 2',
					city: 'city',
					state: 'az',
					zip: '99999',
					coordinates: ['', ''] // lng, lat
				}
				]
			},
			{
				name: 'Food',
				type: 'FOOD',
				date: {
				start: '2015-10-14T15:00:00.000Z',
				end: '2015-10-15T00:00:00.000Z'
				},
				description: 'Pickup Food',
				picture: '',
				locations: [
				{
					name: 'Walgreens',
					address1: 'address 1',
					address2: 'address 2',
					city: 'city',
					state: 'az',
					zip: '99999',
					coordinates: ['', ''] // lng, lat
				}
				]
			},
			{
				name: 'Food',
				type: 'FOOD',
				date: {
				start: '2015-10-16T15:00:00.000Z',
				end: '2015-10-16T00:00:00.000Z'
				},
				description: 'Pickup Food',
				picture: '',
				locations: [
				{
					name: 'Walgreens',
					address1: 'address 1',
					address2: 'address 2',
					city: 'city',
					state: 'az',
					zip: '99999',
					coordinates: ['', ''] // lng, lat
				}
				]
			},
			{
				name: 'Food',
				type: 'FOOD',
				date: {
				start: '2015-10-16T15:00:00.000Z',
				end: '2015-10-17T00:00:00.000Z'
				},
				description: 'Pickup Food',
				picture: '',
				locations: [
				{
					name: 'Walgreens',
					address1: 'address 1',
					address2: 'address 2',
					city: 'city',
					state: 'az',
					zip: '99999',
					coordinates: ['', ''] // lng, lat
				}
				]
			}
		];
		
		return service;

		function all() {
			var eventsDb = eventsFromDbHardCoded;
			
			return eventsDb;
		}
})
.factory('eventsHelper', function () {
	var service = {
		convertToDateMappedObj: convertToDateMappedObj,
		getDateList: getDateList
	};

	return service;
	
	function convertToDateMappedObj(eventsArr) {
		var eventsObj = {};
		
		angular.forEach(eventsArr, function (data) {
				var date = moment(data.date.start).format('YYYY-M-D');
				eventsObj[date] = data;
			});					
			
		return eventsObj;
	}
	
	function getDateList() {
		var weekObj = {};
		var now = moment();
		var firstDay = now.startOf('month');
		var endDay = firstDay.clone().endOf('month');
		console.log('startDate', firstDay);
		console.log('endDate', endDay);
		//# Create a range for the month we can iterate through
		var monthRange = moment.range(firstDay, endDay)
		
		//# Get all the weeks during the current month
		var weeks = {};
		monthRange.by('days', function (moment) {
			if (weeks[moment.week()] === undefined)
				weeks[moment.week()] = {
					'week': moment.week(),
					'start': moment.startOf('isoweek')
				};
		});
		
		console.log('weeks', weeks);
		for (var index = 0; index < 4; index++) {
			var week = moment().add('w', index),
				begin = week.startOf('isoweek');
				
				weekObj[index] = {
					'start': begin.format('YYYY-M-D'),
				
					'days': []
				};
				for (var dayIndex = 0; dayIndex < 5; dayIndex++){
					weekObj[index].days.push(begin.format('YYYY-M-D'));
					begin.add('d', 1);					
				}
				
				weekObj[index].end = begin.format('YYYY-M-D');
				 
		}
		
		return weekObj;	
	}		
})