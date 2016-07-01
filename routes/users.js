const express = require('express');
const fetch = require("node-fetch");
const cheerio = require('cheerio')
const router = express.Router();
const strava = require('strava-v3');
require('dotenv').load();
const token = process.env.access_token;
const api = 'http://www.strava.com';
const models = require('../db/models');
/* GET home page. */

// console.log('req.user', user);
router.get('/', function(req, res, next) {
  fetch( api + '/api/v3/athlete?access_token=' + token)
  .then(function (response) {
    return response.json().then( )
  }).then(function(json) {
    for (var i = 0; i < json.bikes.length; i++) {
      models.bikes().insert({
        bID: json.bikes[i].id,
        ID: json.id,
        name: json.bikes[i].name,
        distance: json.bikes[i].distance
      });
      console.log(json.bikes[i].name);
    };
    res.json(json);
  }).catch(function (error) {
    console.log(error);
  })
});

router.get('/bikereg', function(req, res, next) {
  fetch( 'http://www.bikepedia.com/QuickBike/BikeSpecs.aspx?year=2010&brand=Specialized&model=S-Works+Tarmac+SL3+Dura+Ace')
  .then(function (response) {
    return response.text()
  }).then(function(html) {
    $ = cheerio.load(html);
    var tables = $('table.DetailsView');
    var parts = {};

    for (var j = 1; j < tables.length; j++) {
      var table = $(tables[j]);
      var rows = table.find('tr');

      for (var i = 0; i < rows.length; i++) {
        var columns = $(rows[i]).find('td');
        if (columns.length == 2) {
          parts[columns[0].textContent] = columns[1].textContent;
        }
      }
    }
    res.json(parts);  // { undefined: undefined }
  }).catch(function (error) {
    console.log("cheerio", error);
  });
});

// router.get('/', function(req, res, next) {
//   fetch( api + '/api/v3/athlete?access_token=' + token)
//   .then(function (response) {
//     return response.json().then( )
//   }).then(function(json) {
//     res.json(json);
//   }).catch(function (error) {
//     console.log(error);
//   })
// });

module.exports = router;
