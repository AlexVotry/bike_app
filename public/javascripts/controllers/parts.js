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
    console.log(Stats.user());
    Stats.user().then(members => {
      vm.user = members;
    });
    vm.reg = function(newUser) {
      userInfo.regUser(newUser);
      vm.user.push(newUser);
    };
    vm.auth = function(user) {
      userInfo.authUser(user);
    };
    vm.editMember = function(user) {
      userInfo.editMember(user)
    };
  };
})();
