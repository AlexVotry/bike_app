const express = require('express');
const router = express.Router();
const strava = require('strava-v3');
const knex = require('../db/knex');
const models = require('../db/models');

router.get('/:id', (req, res, next) => {
  models.allParts(req.params.id).select().then(partsInfo => {
    res.json(partsInfo);
  }).catch(function (error) {
    console.log(error);
  })
});

router.put('/mileage', (req, res, next) => {
  var info = req.body;
  console.log(info);
  models.milesToGo(info).then(
    res.json()
  )
  .catch(function (error) {
    console.log(error);
  });
});

router.put('/limit', (req, res, next) => {
  var info = req.body;
  console.log(info);
  models.limitAdjust(info).then(
    res.json()
  )
  .catch(function (error) {
    console.log(error);
  });
});


router.put('/:id', (req, res, next) => {
  var parts = req.body;
  var bikeId = req.params.id;
  console.log('put: ', req.body);
  models.components().where({ bID: bikeId }).update({
    Brakeset:	parts[0].installed,
    ShiftLevers: parts[1].installed,
    FrontDerailleur:	parts[2].installed,
    RearDerailleur:	parts[3].installed,
    Crankset:	parts[4].installed,
    Pedals:	parts[5].installed,
    BottomBracket:	parts[6].installed,
    BBShellWidth:	parts[7].installed,
    RearCogs: parts[8].installed,
    Chain: parts[9].installed,
    Seatpost:	parts[10].installed,
    Saddle:	parts[11].installed,
    Handlebar: parts[12].installed,
    HandlebarStem:	parts[13].installed,
    Headset:	parts[14].installed,
    tubing: parts[15].installed,
    Cables: parts[16].installed,
    fork: parts[17].installed,
    rearShock: parts[18].installed,
    Hubs:	parts[19].installed,
    Rims:	parts[20].installed,
    Tires: parts[21].installed,
    Spokes:	parts[22].installed,
    SpokeNipples: parts[23].installed,
  }).then()
  .catch(function (error) {
    console.log(error);
  });
});

router.delete('/:id', (req, res, next) => {
  var info = req.body;
  var bikeId = req.params.id;
  models.deleteComp(info)
  .then(
    res.json()
  )
  .catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
