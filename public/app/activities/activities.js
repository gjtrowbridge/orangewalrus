angular.module('orangeWalrus.activities', [])

.controller('ActivitiesController', function($scope, Activities) {

  $scope.data = {};

  //Gets all activities from server
  Activities.getActivities().then(function(response) {
    $scope.data.activities = response.data;
  }).catch(function(err) {
    console.log(err);
  });
});