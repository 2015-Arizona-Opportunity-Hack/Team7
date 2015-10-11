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
			console.log("events.all");
			var eventsDb = eventsFromDbHardCoded;
			
			
			return eventsDb;
		}
})
.factory('eventsHelper', function () {
	var service = {
		convertToDateMappedObj: convertToDateMappedObj,
	};

	return service;
	
	function convertToDateMappedObj(eventsArr) {
		var eventsObj = {};
		
		angular.forEach(eventsArr, function (data) {
				var date = moment(data.date.start).format('YYYY-M-D');
				eventsObj[date] = data;
				console.log(eventsObj[date]);						
			});					
		console.log(eventsObj);
			
		return eventsObj;
	}
	
	
})