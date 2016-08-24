

const express = require('express');
const fetch = require("node-fetch");
const router = express.Router();
const strava = require('strava-v3');
const knex = require('../db/knex');
const models = require('../db/models');
/* GET home page. */

router.get('/', (req, res, next) => {
  console.log(req.user, "REQ.USER");
  models.dudeAndBike(req.user).select()
  .then(stravaData => {
    res.json(stravaData);
  }).catch(function (error) {
    console.log(error);
  })
});

module.exports = router;
