angular.module('orangeWalrus.activity', [])

.controller('ActivityController', function($scope, $stateParams, Activities) {

  //Retrieves the specific activity from the server and saves it to the scope
  Activities.getActivity($stateParams.activity_id).then(function(response) {
    $scope.activity = response.data;
  }).catch(function(err) {
    console.log(err);
  });
  
});