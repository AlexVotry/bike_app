const knex = require('./knex');

module.exports = {
  bikes: function bikes() {
    return knex('bikes');
  },
  athletes: function athletes() {
    return knex('athletes');
  },
  components: function components() {
    return knex('components');
  },
  dudeAndBike: function dudeAndBike(user) {
    return knex('athletes').where('athletes.ID', user.ID)
    .join('bikes', {'bikes.ID': 'athletes.ID'});
  },
  allParts: function allParts(bikeId) {
    return knex('components').where({ 'components.bID' : bikeId })
    .join('wear_limits', { 'wear_limits.bike_id': 'components.bID' });
  },

  milesToGo: function milesToGo(info) {
    console.log('info: ', info);
    var miles = info.reset;
    var colName = info.columnName;
    var bikeId = info.bikeId;
    var newData = {};
    newData[colName] = miles;

    return knex('components').where({ 'components.bID' : bikeId })
    .update(newData)
  },

  deleteComp: function deleteComp(info) {
    var comp = info.desc;
    var wear = info.limitColumn;
    var compDist = info.partDist;

    return knex('components').where({ 'components.bID': bikeId })
    .delete(comp, compDist)
      .then(()=> {
        return knex('wear_limits').where({ 'wear_limits.bike_id': bikeId })
      .delete(wear)
    });
  },

  limitAdjust: function limitAdjust(info) {
    var miles = info.limitMiles;
    var colName = info.columnName;
    var bikeId = info.bikeId;
    var newData = {};
    newData[colName] = miles;

    return knex('wear_limits').where({ 'wear_limits.bike_id' : bikeId })
    .update(newData)
  },
  getAthlete: function getAthlete(id) {
    return knex('athletes').where({ ID: id }).first();
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
