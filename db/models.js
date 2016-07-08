const knex = require('./knex');

module.exports = {
  bikes: function bikes() {
    return knex('bikes');
  },
  athletes: function athletes() {
    return knex('athletes');
  },
  // frame_fork: function frame_fork() {
  //   return knex('frame_fork');
  // },
  components: function components() {
    return knex('components');
  },
  // wheels: function wheels() {
  //   return knex('wheels');
  // },
  dudeAndBike: function dudeAndBike() {
    return knex('athletes')
    .join('bikes', {'bikes.ID': 'athletes.ID'});
  },
  allParts: function allParts(bikeId) {
    return knex('components').where({ 'components.bID' : bikeId })
    .join('wear_limits', { 'wear_limits.bike_id': 'components.bID' });
  },

  milesToGo: function milesToGo(info) {
    var miles = info.reset;
    var colName = info.columnName;
    var bikeId = info.bikeId;
    var newData = {};
    newData[colName] = miles;

    return knex('components').where({ 'components.bID' : bikeId })
    .update(newData)
  },

  newId: function newId(table, id) {
    return knex(table).where({ ID: id })
    .first()
    .then((exists) => {
      if (!exists) {
        return true;
      } else {
        return false;
      }
    });
  },
  newAthlete: function newAthlete(profile) {
    const newID = profile.id;
    return knex('athletes').insert({
      ID: newID,
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
      picture: profile.photos[0].value,
      accessToken: profile.token
    },'*')
  },

  newBike: function newBike(profile) {
    const newBikes = profile._json.bikes;
    console.log('newBike', newBikes.length);
    return Promise.all(
    newBikes.map(function(bike) {
      return knex('bikes').insert({
        bID: bike.id,
        ID: profile.id,
        name: bike.name,
        distance: bike.distance,
        manu: "unspecified",
        year: "unspecified",
        model: "unspecified"
      })
    }));
  },
  newParts: function newParts(profile) {
    const newBikes = profile._json.bikes;
    return Promise.all(
      newBikes.map(function(bike) {
        for (var i = 0; i < newBikes.length; i++) {
          return Promise.all ([
            knex('components').insert({
              bID: bike.id,
              distance: bike.distance,
              name: bike.name
            }),
            knex('wear_limits').insert({
              bike_id: bike.id
            })
          ]);
        }
      })
    )
  },

  existingBike: function existingBike(profile) {
    const newBikes = profile._json.bikes;
    for (var i = 0; i < newBikes.length; i++) {
      console.log(newBikes.length);
      return knex('bikes').where({bID: newBikes[i].id}).update({
        distance: newBikes[i].distance
      })
    }
  },

  ensureAuthenticated: function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
};
