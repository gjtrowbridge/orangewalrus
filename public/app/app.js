var app = angular.module('orangeWalrus', [
  'orangeWalrus.factories',
  'orangeWalrus.activities',
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/activities');

  $stateProvider
    .state('activities', {
      url: "/activities",
      templateUrl: 'app/activities/activities.html',
      controller: 'ActivitiesController'
    })
    .state('activity', {
      url: "/activity/:activity_id",
      templateUrl: "/app/activities/activity.html",
      controller: 'ActivityController'
    })
    .state('newActivity', {
      url: '/activities/new',
      templateUrl: '/app/activities/activity.html',
      controller: 'NewActivityController'
    });

});