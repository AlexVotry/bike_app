(function() {
  'use strict';

  angular
  .module('bikes', ['ui.router'])
  .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    // set up states:
      $stateProvider
      .state('login', {
        url: '/login',
        // template: '<h1> You did it! You are login</h1>'
        templateUrl: 'views/login.html'
      })
      .state('bikeList', {
        url: '/bikeList',
        templateUrl: 'views/bikeList.html',
        controllerAs: 'home',
        controller: 'HomeController',
        authenticate: true
      })
      .state('bikeForm', {
        url: "/bikeForm/:bID",
        templateUrl: 'views/bicycle.html',
        controllerAs: 'bicycle',
        controller: 'BikeController'
      })
      .state('partsForm', {
        url: '/partsForm/:bID',
        templateUrl: 'views/parts.html',
        controllerAs: 'parts',
        controller: 'PartsController'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'views/logout.html',
        controllerAs: 'logout',
        controller: "LogoutController"
      })
    };

  })();
