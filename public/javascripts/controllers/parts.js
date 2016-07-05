(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('PartsController', PartsController);

  function PartsController(Stats, $location) {
    let vm = this;
    vm.bikeFormShow = false;
    vm.nameForm = false;
    vm.list = [
        'chain',
        'head set',
        'deraileur',
        'pullies',
        'cable'
        ];
    Stats.user().then(stravaData => {
      vm.user = stravaData;
    });
    // vm.bid =
    vm.bikeForm = function(index) {
      let bike = Stats.thisBicycle(index);
      vm.thisBike = bike;
      vm.bikeFormShow = true;
    };

    vm.editBike = function() {
      console.log(vm.thisBike);
      let bicycle = vm.thisBike;
      Stats.editBike(bicycle);
      vm.bikeFormShow = false;
    }
  };
})();
