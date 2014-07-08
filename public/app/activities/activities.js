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
  };

  $scope.clicked = function(attr) {
    console.log(attr);
  };
  
})

//Handles editing activities
.controller('ActivityFormController', function($scope, $location, $stateParams, Activities) {
  if ($stateParams.activity_id) {
    $scope.edit = true;
    Activities.getActivity($stateParams.activity_id).then(function(response) {
      $scope.activity = response.data;
    }).catch(function(err) {
      console.log(err);
    });
  } else {
    $scope.activity = {};
  }

  if ($scope.activity.tags === undefined) {
    $scope.activity.tags = [];
  }

  $scope.saveActivity = function() {
    if ($scope.edit) {
      Activities.updateActivity($scope.activity).then(function(response) {
        console.log('Activity updated');
        $location.path('/activity/' + response.data.activity_id);
      }).catch(function(err) {
        console.log(err);
      });
    } else {
      Activities.addActivity($scope.activity).then(function(response) {
        console.log('Activity updated');
        $location.path('/activity/' + response.data.activity_id);
      }).catch(function(err) {
        console.log(err);
      });
    }
  };

  $scope.addTag = function() {
    if ($scope.tag !== '' && $scope.activity.tags.indexOf($scope.tag) === -1) {
      $scope.activity.tags.unshift($scope.tag);
    }
    $scope.tag = '';
  };

  $scope.removeTag = function(tag) {
    var i = $scope.activity.tags.indexOf(tag);
    if (i >= 0) {
      $scope.activity.tags.splice(i,1);
    }
  }
})


.directive('ngActivityLink', function() {
  return {
    restrict: 'E',
    templateUrl: '/app/activities/activityLink.html'
  }
});