(function () {
  'use strict';

  angular
  .module('bikes')
  .factory('Stats', Stats);

  function Stats($http) {
    let chosen = [];
    let stravaData = {};
    let url = "/users";
    let all = {bicycles: []};
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
      thisBicycle: function(bID) {
        for (var i = 0; i < all.bicycles.length; i++) {
          if  (all.bicycles[i].bID === bID) {
            return all.bicycles[i];
          }
        }
      },
      editBike: function(bicycle) {
        $http.put(`${url}/`, bicycle);
      },
    }
  }
})();
