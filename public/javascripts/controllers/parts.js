(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('PartsController', PartsController);

  function PartsController(Stats, $location) {
    let vm = this;
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
    Stats.showData();

    vm.partsInfo = function() {
      let bikeReg = Stats.partsData();
    }
    // vm.bicyles = bicyles;
    // console.log('Stats ', Stats.user(vm.user));

    // Stats.seedBikes().
    vm.editBike = function(user) {
      bikeInfo.editBike(user)
    };
  };
})();
