(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('PartsController', PartsController);

function PartsController(Parts, $location, $stateParams) {
      let vm = this;
      let bikeId = $stateParams.bID;
      console.log(bikeId);
      Parts.partsData(bikeId).then(partInfo => {
          vm.theseParts = partInfo.comps;
          vm.used = partInfo.used;
          vm.togo = partInfo.toGo;

      });
      vm.mileageReset = function(miles, index) {
        Parts.resetPartsMileage(miles, index);
        }
      vm.editParts = function() {
        let allParts = vm.theseParts;
        Parts.editParts(allParts);
      }
      vm.editForks = function() {
        let allParts = vm.theseParts;
        Parts.editForks(allParts);
      }
      vm.editWheels = function() {
        let allParts = vm.theseParts;
        Parts.editWheels(allParts);
      }
    };
  })();
