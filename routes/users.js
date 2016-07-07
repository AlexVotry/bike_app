'use strict;'

const express = require('express');
const fetch = require("node-fetch");
const cheerio = require('cheerio')
const router = express.Router();
const strava = require('strava-v3');
require('dotenv').load();
const token = process.env.access_token;
const api = 'http://www.strava.com';
const knex = require('../db/knex');
const models = require('../db/models');
/* GET home page. */

// console.log('req.user', user);
router.get('/', (req, res, next) => {
  models.dudeAndBike().select()
  .then(stravaData => {
    res.json(stravaData);
  }).catch(function (error) {
    console.log(error);
  })
});

router.get('/:id', (req, res, next) => {
  models.allParts(req.params.id).select().then(partsInfo => {
    res.json(partsInfo);
  }).catch(function (error) {
    console.log(error);
  })
});

router.put('/', (req, res, next) => {
  var bicycle = req.body;
  models.bikes().where({ bID: bicycle.bID }).update({
    name: bicycle.name,
    manu: bicycle.manu,
    year: bicycle.year,
    model: bicycle.model
  }).then()
  .catch(function (error) {
    console.log(error);
  });
});

router.put('/parts', (req, res, next) => {
  var parts = req.body;
  models.components().where({ bID: parts.bID }).update({
    Brakeset:	parts.Brakeset,
    ShiftLevers: parts.ShiftLevers,
    FrontDerailleur:	parts.FrontDerailleur,
    RearDerailleur:	parts.RearDerailleur,
    Crankset:	parts.Crankset,
    Pedals:	parts.Pedals,
    BottomBracket:	parts.BottomBracket,
    BBShellWidth:	parts.BBShellWidth,
    RearCogs: parts.RearCogs,
    Chain: parts.Chain,
    Seatpost:	parts.Seatpost,
    Saddle:	parts.Saddle,
    Handlebar: parts.Handlebar,
    HandlebarExtensions: parts.HandlebarExtensions,
    HandlebarStem:	parts.HandlebarStem,
    Headset:	parts.Headset,
    Cables: parts.Cables,
    brakeDistance: parts.brakeDistance,
    leverDistance: parts.leverDistance,
    fdDistance: parts.fdDistance,
    rdDistance: parts.rdDistance,
    cranksetDistance: parts.cranksetDistance,
    pedalDistance: parts.pedalDistance,
    bbDistance: parts.bbDistance,
    cogDistance: parts.cogDistance,
    chainDistance: parts.chainDistance,
    saddleDistance: parts.saddleDistance,
    headsetDistance: parts.headsetDistance,
    cableDistance: parts.cableDistance,
    paddistance: parts.paddistance
  }).then()
    .catch(function (error) {
      console.log(error);
    });
});

router.put('/forks', (req, res, next) => {
  var forks = req.body;
  models.frame_fork().where({ bID: forks.bID }).update({
    tubing: forks.tubing,
    fork: forks.fork,
    forkDistance: forks.forkDistance,
    rearShock: forks.rearShock,
    rearDistance: forks.rearDistance
  }).then()
  .catch(function (error) {
    console.log(error);
  });
})

router.put('/wheels', (req, rew, next) => {
  var wheels = req.body;
  models.wheels().where({ bID: wheels.bID }).update({
    Hubs:	wheels.Hubs,
    hubDistance: wheels.hubDistance,
    Rims:	wheels.Rims,
    rimDistance: wheels.rimDistance,
    Tires: wheels.Tires,
    tireDistance: wheels.tireDistance,
    Spokes:	wheels.Spokes,
    SpokeNipples: wheels.SpokeNipples
  }).then()
  .catch(function (error) {
    console.log(error);
  });
})

// router.get('/bikereg', function(req, res, next) {
//   fetch( 'http://www.bikepedia.com/QuickBike/BikeSpecs.aspx?year=2010&brand=Specialized&model=S-Works+Tarmac+SL3+Dura+Ace')
//   .then(function (response) {
//     return response.text()
//   }).then(function(html) {
//     $ = cheerio.load(html);
//     var tables = $('table.DetailsView');
//     var parts = {};
//
//     for (var j = 1; j < tables.length; j++) {
//       var table = $(tables[j]);
//       var rows = table.find('tr');
//
//       for (var i = 0; i < rows.length; i++) {
//         var columns = $(rows[i]).find('td');
//         if (columns.length == 2) {
//           parts[columns[0].textContent] = columns[1].textContent;
//         }
//       }
//     }
//     res.json(parts);  // { undefined: undefined }
//   }).catch(function (error) {
//     console.log("cheerio", error);
//   });
// });

module.exports = router;
