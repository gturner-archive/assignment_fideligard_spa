"use strict";
app.controller('DateCtrl', ["$scope", 'date', 'dateService', 'dates', function($scope, date, dateService, dates) {

  $scope.editing = false;
  $scope.selectedDate = date;
  $scope.dates = dates;

  $scope.setDate = function(day) {
    dateService.setDay(day);
  };

  $scope.changeDate = function(day) {
    var index = dates.indexOf(day);
    if (index > -1) {
      $scope.newDate = index
      dateService.setDay(index);
    	$scope.editing = !$scope.editing;
    }
  };

  //Still need to make date input update on change in date

}]);
