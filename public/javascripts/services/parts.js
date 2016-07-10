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
        console.log(bikeId);
        return $http.get(`${url}/${bikeId}`)
        .then((result) => {
          let comps = result.data[0];
          let totalDist = parseInt(comps.distance * 0.00062137);
          comps.distance = totalDist;
          dist = [
            'forkDistance',
            'rearDistance',
            'padDistance',
            'leverDistance',
            'fdDistance',
            'rdDistance',
            'cranksetDistance',
            'pedalDistance',
            'bbDistance',
            'cogDistance',
            'chainDistance',
            'saddleDistance',
            'headsetDistance',
            'cableDistance',
            'hubDistance',
            'rimDistance',
            'tireDistance'
          ];
          limits = [
            'seals_dist',
            'seals_dist',
            'pad_dist',
            'lever_dist',
            'fd_dist',
            'rd_dist',
            'crank_dist',
            'pedal_dist',
            'bb_dist',
            'cog_dist',
            'chain_dist',
            'saddle_dist',
            'headset_dist',
            'cable_dist',
            'hub_dist',
            'rim_dist',
            'tire_dist',
            'pulleys_dist',
            'cleats_dist'
          ]
          function spent(dist,limits) {
            for (var i = 0; i < dist.length; i++) {
              let wornMiles = parseInt((totalDist) - comps[dist[i]]);
              parts.used.push(wornMiles);
              // miles left to go:
              parts.toGo.push(comps[limits[i]]);
            }
          };
          spent(dist, limits);
          parts.dist = dist;
          parts.comps = comps;
          return parts;
        })
      },
      resetPartsMileage: function(miles, index) {
        var usedMiles = parts.comps.distance - miles;
        var info = {bikeId: parts.comps.bID, reset: usedMiles, columnName: parts.dist[index]}
        $http.put(`${url}/mileage`, info);
      },
      editParts: function(allParts) {
        $http.put(`${url}/parts`, allParts)
      }
    }
  }
})();


//   printOut: function (parts) {
//   for (var i = 0; i < array.length; i++) {
//     document.write(
//       <div class="row col-sm-12">
//       <h4 class="col-sm-2 description" ng-click="partsbrakesForm = !partsbrakesForm">Brakeset: </h4>
//       <h4 class="col-sm-3" ng-click="partsbrakesForm = !partsbrakesForm"> {{ parts.theseParts.Brakeset }}</h4>
//       <h4 class="col-sm-2" ng-click="partsused2= !partsused2">pads: {{ parts.used[2] }}</h4>
//       <button type="submit" class="btn btn-primary btn-xs	glyphicon glyphicon-wrench" name="addIt" ng-click="parts.mileageReset(0, 2)">replaced!</button>
//       <h4 class="col-sm-2">pads: {{ parts.togo[2] - parts.used[2] }}</h4>
//     </div>
//     <div class="row col-sm-12">
//       <div class="col-sm-4" ng-show="partsbrakesForm">
//         <input type="text" ng-model="parts.theseParts.Brakeset" ></div>
//       <div class="col-sm-2" ng-show="partsused2">
//         <input type="number" ng-model="parts.used[2]" ng-change="parts.mileageReset(parts.used[2], 2)">
//       </div>
//     </div>
//   )
//   }
// }
