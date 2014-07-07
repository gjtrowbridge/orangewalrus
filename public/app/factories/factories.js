angular.module('orangeWalrus.factories', [])

.factory('Activities', function($http) {
  return {
    getActivities: function() {
      return $http({ method: 'GET', url: 'api/activities' });
    }
  };
});