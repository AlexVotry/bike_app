const express = require('express');
const router = express.Router();
const strava = require('strava-v3');
const knex = require('../db/knex');
const models = require('../db/models');

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

module.exports = router;
