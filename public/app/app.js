var app = angular.module('orangeWalrus', [
  'orangeWalrus.factories',
  'orangeWalrus.activities',
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('activities', {
      url: "/activities",
      templateUrl: 'app/activities/activities.html'
    })
    .state('activity', {
      url: "/activity",
      templateUrl: "/app/activities/activity.html"
    });

});