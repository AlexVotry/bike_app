(function () {
  'use strict';

  angular
  .module('bikes')
  .factory('Parts', Parts);

  function Parts($http) {
    let url = "/users";
    let parts = { used: [], toGo: [] };
    let dist = [];
    let limits = [];
    return {
      partsData: function(bikeId) {
        return $http.get(`${url}/${bikeId}`)
        .then((result) => {
          let comps = result.data[0];
          let totalDist = comps.distance;
          dist = [
            comps.forkDistance,
            comps.rearDistance,
            comps.paddistance,
            comps.leverDistance,
            comps.fdDistance,
            comps.rdDistance,
            comps.cranksetDistance,
            comps.pedalDistance,
            comps.bbDistance,
            comps.cogDistance,
            comps.chainDistance,
            comps.saddleDistance,
            comps.headsetDistance,
            comps.cableDistance,
            comps.hubDistance,
            comps.rimDistance,
            comps.tireDistance
          ];
          limits = [
            comps.seals_dist,
            comps.seals_dist,
            comps.pad_dist,
            comps.lever_dist,
            comps.fd_dist,
            comps.rd_dist,
            comps.crank_dist,
            comps.pedal_dist,
            comps.bb_dist,
            comps.cog_dist,
            comps.chain_dist,
            comps.saddle_dist,
            comps.headset_dist,
            comps.cable_dist,
            comps.hub_dist,
            comps.rim_dist,
            comps.tire_dist,
            comps.pulleys_dist,
            comps.cleats_dist
          ]
          function spent(dist,limits) {
            for (var i = 0; i < dist.length; i++) {
              // used miles:
              let wornMiles = parseInt((totalDist - dist[i]) * 0.00062137);
              parts.used.push(wornMiles);
              // miles left to go:
              parts.toGo.push(limits[i] - wornMiles);
            }
          };
          spent(dist, limits);
          parts.dist = dist;
          parts.comps = comps;
          return parts;
        })
      },
      resetPartsMileage: function() {

      },
      editParts: function(allParts) {
        $http.put(`${url}/parts`, allParts)
      },
      editForks: function(allParts) {
        $http.put(`${url}/forks`, allParts)
      },
      editWheels: function(allParts) {
        $http.put(`${url}/wheels`, allParts)
      },
    }
  }
})();
