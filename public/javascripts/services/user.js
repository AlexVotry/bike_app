(function () {
  'use strict';

  angular
  .module('bikes')
  .factory('Stats', Stats);

  function Stats($http) {
    let chosen = [];
    let stravaData = {};
    return {
      user: function() {
        return $http.get("/users")
        .then((result) => {
          stravaData = result.data;
          return stravaData;
        });
      },

      showData: function() {
        console.log(stravaData);
      },

      partsData: function() {
        return $http.get("/users/bikereg")
        .then((result) => {
          return result.data;
        })
      }
      // editBike: function(bikeID) {
      //   return $http.put(url, bike);
      // }

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
