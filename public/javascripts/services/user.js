(function () {
  'use strict';

  angular
  .module('bikes')
  .factory('Stats', Stats);

  function Stats($http) {
    let chosen = [];
    // let token = process.env.access_token;
    let info = "/strava";
    return {
      user: function() {
        return $http.get(info)
        .then(function(result) {
          return result.data;
        });
      }
      // auth: function(user) {
      //   return
      //   $http.post(`${info}/auth/login`, user);
      // }
      // reg: function(newUser) {
      //   $http.post(`${info}/auth/register`, newUser);
      // }
      // change: function(user) {
      //   $http.put(`${info}/members/${id}`, user);
      // }
    }
  }
})();
