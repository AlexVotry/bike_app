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
        controllerAs: 'bike',
        controller: 'PartsController',
        authenticate: true
      })
      .state('bikeList.Tarmac', {
        url: "/Tarmac",
        templateUrl: 'views/list.html',
        controllerAs: 'bike',
        controller: 'PartsController'
        })
        // .state('bikeList.lol', {
        //   url: '/LordoftheRings',
        //   templateUrl: 'views/list.html',
        //   controller: function($scope) {
        //     $scope.list = ["Frodo Baggins", "Peregrin Took", "Sauron", "Gollum", "Aragorn"];
        //   }
        // })
    };

  })();
