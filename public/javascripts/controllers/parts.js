(function() {
  'use strict';

  angular
    .module('bikes')
    .controller('PartsController', PartsController);

  function PartsController($location) {
    let vm = this;
    vm.list = [
        'chain',
        'head set',
        'deraileur',
        'pullies',
        'cable'
        ];
      }
  //   vm.qtyTotal = 0;
  //   vm.costs = ['higher', 'lower'];
  //   vm.qtys = getParts.qty;
  //   vm.addQty = function (amt, indx) {
  //     let teaInfo = getParts.addTea(vm.qtyTotal, amt, indx);
  //     vm.qtyTotal = teaInfo.total;
  //   }
  //   getParts.teaBags().then(tdata => {
  //     vm.teas = tdata;
  //   });
  //   getParts.teaCat().then(cdata => {
  //     vm.cats = cdata;
  //   });
  //   vm.advance= function() {
  //     $location.path(`/checkout`);
  //   };
  // };

})();
