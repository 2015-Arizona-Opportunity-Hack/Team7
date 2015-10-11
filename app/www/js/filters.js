angular.module('starter.filters', [])
	.filter('dateToDayShortName', function () {
		return function getDayShortName(date) {
			var dayOfWeek = moment(date, 'YYYY-M-D').day();
			switch (dayOfWeek) {
				case 1:
					return "M";
				case 2:
					return "TU";
				case 3:
					return "W";
				case 4:
					return "TH";
				case 5:
					return "F";
			}
		};
});