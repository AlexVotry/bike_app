(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('PartsController', PartsController);

  function PartsController(Stats, $location, $stateParams) {
    let vm = this;
    let bikeId = $stateParams.bID;
    vm.bikeDistance = Stats.getDistance(bikeId);
    console.log(vm.bikeDistance, ' bikeDistance');
    Stats.partsData(bikeId).then(partInfo => {
      vm.theseParts = partInfo[0];
    });

    vm.editBike = function() {
      console.log(vm.thisBike);
      let bicycle = vm.thisBike;
      Stats.editBike(bicycle);
      vm.nameForm = false;
      vm.manuForm = false;
      vm.yearForm = false;
      vm.modelForm = false;
    }
  };
})();
