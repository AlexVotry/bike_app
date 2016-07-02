(function () {
  'use strict';

  angular
  .module('bikes')
  .factory('Stats', Stats);

  function Stats($http) {
    let chosen = [];
    let stravaData = {};
    let url = "/users";
    return {
      user: function() {
        return $http.get(url)
        .then((result) => {
          var stravaData = result.data;
          var both = {};
          both.user = `${stravaData[0].firstname} ${stravaData[0].lastname}`;
          both.pic = stravaData[0].picture;
          both.bicycles = [];
          for (var i = 0; i < stravaData.length; i++) {
            both.bicycles.push({
              bID : stravaData[i].bID,
              name : stravaData[i].name,
              manu : stravaData[i].manu,
              year : stravaData[i].year,
              model: stravaData[i].model,
              distance : stravaData[i].distance
            });
          };
          return both;
        });
      },

      editBikes: function(bicycle) {
        $http.put(`${url}`, bicycle);
      },

      // showData: function() {
      //   console.log(stravaData);
      // },

      partsData: function() {
        return $http.get(`${url}/bikereg`)
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
