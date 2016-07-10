(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('PartsController', PartsController);

  function PartsController(Parts, $location, $stateParams) {
    let vm = this;
    let bikeId = $stateParams.bID;
    // vm.partsDisplay = Parts.printOut();
    console.log(bikeId);
    Parts.partsData(bikeId).then(partInfo => {
        vm.theseParts = partInfo;
        vm.used = partInfo.used;
        vm.togo = partInfo.toGo;
        console.log(vm.theseParts);
    });

    vm.mileageReset = function(miles, index) {
      Parts.resetPartsMileage(miles, index);
      // vm.used =
      };

    vm.editParts = function() {
      let allParts = vm.theseParts;
      Parts.editParts(allParts);
    };
  }
})();
