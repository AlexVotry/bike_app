(function () {
  'use strict';

  angular
  .module('bikes')
  .factory('Stats', Stats);

  function Stats($http) {
    let chosen = [];
    let stravaData = {};
    let url = "/users";
    var all = {};
    return {
      user: function() {
        return $http.get(url)
        .then((result) => {
          var stravaData = result.data;
          all.user = `${stravaData[0].firstname} ${stravaData[0].lastname}`;
          all.pic = stravaData[0].picture;
          all.bicycles = [];
          for (var i = 0; i < stravaData.length; i++) {
            all.bicycles.push({
              bID : stravaData[i].bID,
              name : stravaData[i].name,
              manu : stravaData[i].manu,
              year : stravaData[i].year,
              model: stravaData[i].model,
              distance : stravaData[i].distance
            });
          };
          return all;
        });
      },
      thisBicycle: function(index) {
        return all.bicycles[index];
      },

      editBike: function(bicycle) {
        $http.put(`${url}/`, bicycle)
      },

      partsData: function() {
        return $http.get(`${url}/bikereg`)
        .then((result) => {
          return result.data;
        })
      }
    }
  }
})();
