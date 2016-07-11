(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('PartsController', PartsController)
    .filter('custom', custom);

  function PartsController(Parts, $location, $stateParams) {
    let vm = this;
    let bikeId = $stateParams.bID;
    vm.theseParts = {};
    // vm.code = event.which ===13 || event.keyCode === 13;
    Parts.partsData(bikeId).then(partInfo => {
        vm.theseParts = partInfo;
    });

    vm.mileageAdjust = function(miles, name) {
      Parts.resetPartsMileage(miles, name);
    };

    vm.mileageReset = function(miles, name) {
      Parts.resetPartsMileage(miles, name);
      location.reload();
    };

    vm.limitReset = function(miles, name) {
      Parts.limitAdjust(miles, name);
    };

    vm.editParts = function() {
      let allParts = vm.theseParts;
      Parts.editParts(allParts);
      location.reload();
    };

    vm.deletePart = function(desc, max, dist) {
      console.log(desc, max, dist);
      Parts.deletePart(desc, max, dist);
    }
  };

  function custom() {
    return function(input, search) {
      if (!input) return input;
        if (!search) return input;
        var expected = ('' + search).toLowerCase();
        var result = {};
        angular.forEach(input, function(value, key) {
          var actual = ('' + value).toLowerCase();
          if (actual.indexOf(expected) !== -1) {
            result[key] = value;
          }
        });
        return result;
      }
    };

})();
