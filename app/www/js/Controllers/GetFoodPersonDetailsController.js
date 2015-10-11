angular.module('starter.controller.getfoodperson', [])
  .controller('GetFoodPersonDetailsController', function ($scope) {

    console.log("GetFoodPersonDetailsController");
    var str = "";
    for (var index = 0; index < 4; index++) {
      var now = moment().add('w', index),
        begin = now.startOf('isoweek');

      str += "<div class='item'><h3>" + begin.format('M-D-YYYY')
      var end = begin.add('d', 4);

      str += ' to ' + begin.format('M-D-YYYY') + '</h3>';
      str += "<div>";
      str += '<div class="button-bar button-bar-inline"><a class="button button-large button-balanced">M</a><a class="button button-large">Tu</a><a class="button button-large">W</a><a class="button button-large">Th</a></div>';
      str += '<div class="button-bar button-bar-inline"><a class="button button-large">F</a></div>';
      str += "</div></div >";
    }

    $scope.temp = str
// document.body.innerHTML = str;


// 					<div>
// 			<h3>Ocotober 12-16</h3>
// 		</div>
// 			<div class="button-bar button-small item-radio">
//   <a class="button button-large button-balanced">M</a>
//   <a class="button button-large">Tu</a>
//   <a class="button button-large">W</a>
//   <a class="button button-large">Th</a>
//   <a class="button button-large">F</a>
// </div>

    // /api/events?rollingWeeks=4&type=FOOD
    var events = [
      {
        name: 'Food',
        type: 'FOOD',
        date: {
          start: 'utc 8:00am',
          end: 'utc 5:00pm'
        },
        description: '',
        picture: '',
        locations: [
          {
            name: 'Walgreens',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            coordinates: ['', ''] // lng, lat
          }
        ]
      }
    ];

    // using moment create this structure. Rolling 4 week
    var rollingWeeks = [
      ['utcDate day 1', 'utcDate day 2'], // week 1
      [] // week 2
    ];
  });
