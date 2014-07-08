var app = angular.module('orangeWalrus', [
  'orangeWalrus.factories',
  'orangeWalrus.activities',
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/activities');

  $stateProvider
    .state('listActivities', {
      url: "/activities",
      templateUrl: 'app/activities/activities.html',
      controller: 'ActivitiesController'
    })
    .state('showActivity', {
      url: "/activity/:activity_id",
      templateUrl: "/app/activities/activity.html",
      controller: 'ActivityController'
    })
    .state('editActivity', {
      url: "/activity/:activity_id/edit",
      templateUrl: "/app/activities/activityForm.html",
      controller: 'ActivityFormController'
    })
    .state('newActivity', {
      url: '/activities/new',
      templateUrl: '/app/activities/activityForm.html',
      controller: 'ActivityFormController'
    });

});