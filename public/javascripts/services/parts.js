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
        // parts = {};
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
            // parts = {};
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
