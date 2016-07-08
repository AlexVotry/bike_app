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
  console.log(req.params.id);
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
    paddistance: parts.paddistance,
    tubing: parts.tubing,
    fork: parts.fork,
    forkDistance: parts.forkDistance,
    rearShock: parts.rearShock,
    rearDistance: parts.rearDistance,
    Hubs:	parts.Hubs,
    hubDistance: parts.hubDistance,
    Rims:	parts.Rims,
    rimDistance: parts.rimDistance,
    Tires: parts.Tires,
    tireDistance: parts.tireDistance,
    Spokes:	parts.Spokes,
    SpokeNipples: parts.SpokeNipples
  }).then()
  .catch(function (error) {
    console.log(error);
  });
})

module.exports = router;
