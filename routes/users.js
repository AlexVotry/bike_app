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

// router.get('/:id', (req, res, next) => {
//   models.bikes().select().where({ bID : req.params.id }).then(bikeInfo => {
//     res.json(bikeInfo);
//   }).catch(function (error) {
//     console.log(error);
//   })
// });

router.put('/', (req, res, next) => {
  var bicycle = req.body;
  models.bikes().where({ bID: bicycle.bID }).update({ name: bicycle.name, manu: bicycle.manu, year: bicycle.year, model: bicycle.model })
  .then()
  .catch(function (error) {
    console.log(error);
  });
});

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
