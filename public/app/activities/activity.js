angular.module('orangeWalrus.activity', [])

.controller('ActivityController', function($scope, $stateParams, Activities) {
  var activity_id = $stateParams.activity_id;
  Activities.getActivity(activity_id).then(function(response) {
    $scope.activity = response.data;
    console.log($scope.activity);
  }).catch(function(err) {
    console.log(err);
  })
});