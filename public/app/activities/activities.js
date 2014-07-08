angular.module('orangeWalrus.activities', [])

.controller('ActivitiesController', function($scope, Activities) {

  $scope.data = {};

  //Gets all activities from server
  Activities.getActivities().then(function(response) {
    $scope.data.activities = response.data;
  }).catch(function(err) {
    console.log(err);
  });
})

.controller('ActivityController', function($scope, $location, $stateParams, Activities) {

  //Retrieves the specific activity from the server and saves it to the scope
  Activities.getActivity($stateParams.activity_id).then(function(response) {
    $scope.activity = response.data;
  }).catch(function(err) {
    console.log(err);
  });

  $scope.deleteActivity = function() {
    Activities.deleteActivity($scope.activity._id).then(function(response) {
      console.log('Activity deleted');

      //Send user back to activities list, since this activity is now gone
      $location.path('/activities');

    }).catch(function(err) {
      console.log(err);
    });
  }

  $scope.clicked = function(attr) {
    console.log(attr);
  }
  
})

//Handles adding activities
.controller('NewActivityController', function($scope, Activities) {
  $scope.activity = {};
  $scope.saveActivity = function() {
    Activities.addActivity($scope.activity).then(function(response) {
      console.log('Activity added');
    }).catch(function(err) {
      console.log(err);
    });
  }
})

//Handles editing activities
.controller('EditActivityController', function($scope, $stateParams, Activities) {
  Activities.getActivity($stateParams.activity_id).then(function(response) {
    $scope.activity = response.data;
  }).catch(function(err) {
    console.log(err);
  });

  $scope.saveActivity = function() {
    Activities.updateActivity($scope.activity).then(function(response) {
      console.log('Activity updated');
    }).catch(function(err) {
      console.log(err);
    });
  }
})


.directive('ngActivityLink', function() {
  return {
    restrict: 'E',
    templateUrl: '/app/activities/activityLink.html'
  }
});