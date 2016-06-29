var express = require('express');
var fetch = require("node-fetch");
var cheerio = require('cheerio')
var router = express.Router();
var strava = require('strava-v3');
require('dotenv').load();
var token = process.env.access_token;
var api = 'http://www.strava.com'
/* GET home page. */

router.get('/strava', function(req, res, next) {
  // fetch( api + '/api/v3/athlete?access_token=' + token)
  // .then(function (response) {
  //   return response.json()
  // }).then(function(json) {
  //   console.log(json);
  //   res.json(json);
  // }).catch(function (error) {
  //   console.log(error);
  // })
  fetch( 'http://www.bikepedia.com/QuickBike/BikeSpecs.aspx?year=2010&brand=Specialized&model=S-Works+Tarmac+SL3+Dura+Ace')
  .then(function (response) {
    console.log(response);
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
        console.log('COLUMNS', columns);
        if (columns.length == 2) {
          parts[columns[0].textContent] = columns[1].textContent;
        }
      }
    }
    console.log('PARTS', parts);
    res.json(parts);
  }).catch(function (error) {
    console.log("cheerio", error);
  })
});

strava.athletes.get({id: 120316}, function(err, payload) {
// strava.athletes.get({'access_token': 'id'}, function(err, payload) {
  if(!err) {
    console.log(payload);
  }
  else {
    console.log(err);
  }
});

module.exports = router;
