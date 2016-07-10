(function () {
  'use strict';

  angular
  .module('bikes')
  .factory('Parts', Parts);

  function Parts($http) {
    let url = "/users";
    // let parts = { used: [], toGo: [], installed: [], maxMiles: [] };
    let parts = new Object();
    let dist = [];
    let limits = [];
    let components = [];
    let partInfo = [];
    return {
      partsData: function(bikeId) {
        return $http.get(`${url}/${bikeId}`)
        .then((result) => {
          let comps = result.data[0];
          let totalDist = parseInt(comps.distance * 0.00062137);
          comps.distance = totalDist;
          components = [
            'Brakeset',
            'ShiftLevers',
            'FrontDerailleur',
            'RearDerailleur',
            'Crankset',
            'Pedals',
            'BottomBracket',
            'BBShellWidth',
            'RearCogs',
            'Chain',
            'Saddle',
            'Seatpost',
            'Handlebar',
            'HandlebarStem',
            'Headset',
            'tubing',
            'Cables',
            'fork',
            'rearShock',
            'Hubs',
            'Rims',
            'Tires',
            'Spokes',
            'SpokeNipples',
          ];
          dist = [
            'padDistance',
            'leverDistance',
            'fdDistance',
            'rdDistance',
            'cranksetDistance',
            'pedalDistance',
            'bbDistance',
            'NA',
            'cogDistance',
            'chainDistance',
            'saddleDistance',
            'NA',
            'NA',
            'NA',
            'headsetDistance',
            'NA',
            'cableDistance',
            'forkDistance',
            'rearDistance',
            'hubDistance',
            'rimDistance',
            'tireDistance',
            'NA',
            'NA'
          ];
          limits = [
            'pad_dist',
            'lever_dist',
            'fd_dist',
            'rd_dist',
            'crank_dist',
            'pedal_dist',
            'bb_dist',
            'NA',
            'cog_dist',
            'chain_dist',
            'saddle_dist',
            'NA',
            'NA',
            'NA',
            'headset_dist',
            'NA',
            'cable_dist',
            'hub_dist',
            'rim_dist',
            'tire_dist',
            'seals_dist',
            'seals_dist',
            'NA',
            'NA'
            // 'pulleys_dist',
            // 'cleats_dist'
          ]
          function Parts(desc, installed, used, maxMiles, toGo, maxName, partDistance) {
          this.desc = desc;
          this.installed = installed;
          this.used = used;
          this.maxMiles = maxMiles;
          this.toGo = toGo;
          this.maxName = maxName;
          this.partDistName = partDistance;
          };

          function spent(dist, limits, components) {
            for (var i = 0; i < dist.length; i++) {
              let description = components[i];
              let installed = comps[components[i]];
              let maxName = limits[i];
              let partDistance = dist[i];
              if(dist[i] != 'NA') {
                let limitMiles = comps[limits[i]];
                let wornMiles = parseInt((totalDist) - comps[dist[i]]);
                let toGo = (limitMiles - wornMiles);
                let parts = new Parts(description, installed, wornMiles, limitMiles, toGo, maxName, partDistance)
                partInfo.push(parts);
              } else {
                let limitMiles = 30000;
                let wornMiles = 30000;
                let toGo = 30000;
                let parts = new Parts(description, installed, wornMiles, limitMiles, toGo, maxName, partDistance)
                partInfo.push(parts);
              }
            }
          }
          spent(dist, limits, components);
          parts.comps = comps;
          partInfo.name = comps.name;
          return partInfo;
        })
      },

      resetPartsMileage: function(miles, name) {
        console.log('resetPartsMileage: ', parts.comps.distance);
        var usedMiles = parts.comps.distance - miles;
        var info = { bikeId: parts.comps.bID, reset: usedMiles, columnName: name };
        $http.put(`${url}/mileage`, info);
      },

      limitAdjust: function(miles, name) {
        var info = { bikeId: parts.comps.bID, limitMiles: miles, columnName: name};
        $http.put(`${url}/limit`, info);
      },

      editParts: function(allParts) {
          var bikeId = parts.comps.bID;
        $http.put(`${url}/parts/${bikeId}`, allParts);
      },

      deletePart: function(desc, max, dist) {
        var bikeId = parts.comps.bID;
        var info = {description: desc, limitColumn: max, partDist: dist };
        $http.put(`${url}/parts/${bikeId}`, info);
      }
    }
  }
})();
<<<<<<< HEAD


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
=======
>>>>>>> 998feaac58c027e563df52c52536fd70ee3d1363
