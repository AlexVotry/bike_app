(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('BikeController', BikeController);

  function BikeController(Stats, $location, $stateParams) {
    let vm = this;
    let bikeId = $stateParams.bID;
    vm.thisBike = Stats.thisBicycle(bikeId);
    vm.editBike = function(bicycle) {
      // let bicycle = vm.thisBike;
      console.log(bicycle);
      Stats.editBike(bicycle);
      vm.nameForm = false;
      vm.manuForm = false;
      vm.yearForm = false;
      vm.modelForm = false;
    }
  };
})();
