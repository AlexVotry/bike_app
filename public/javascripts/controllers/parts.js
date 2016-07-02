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
    vm.editBike = function(bicyle) {
      console.log(bicyle, 'blah')
      Stats.editBike(bicyle)
    }
    Stats.user().then(stravaData => {
      vm.user = stravaData;
    });
    // console.log($index);
  };
})();
