angular.module('orangeWalrus.factories', [])

.factory('Activities', function($http) {
  return {
    getActivities: function() {
      return $http({ method: 'GET', url: 'api/activities' });
    },
    addActivity: function(activity) {
      return $http({ method: 'POST', url: 'api/activities', data: activity });
    },
    getActivity: function(activity_id) {
      return $http({ method: 'GET', url: 'api/activity/' + activity_id });
    },
    updateActivity: function(activity) {
      return $http({ 
        method: 'PUT',
        url: 'api/activity/' + activity._id,
        data: activity
      })
    },
    deleteActivity: function(activity_id) {
      return $http({ method: 'DELETE', url: 'api/activity/' + activity_id });
    }
  };
});