(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('HomeController', HomeController);

  function HomeController(Stats, $location, $stateParams) {
    let vm = this;
    Stats.user().then(stravaData => {
      vm.user = stravaData;
    });
  };
})();
