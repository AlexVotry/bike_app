const knex = require('./knex');

module.exports = {
  bikes: function bikes() {
    return knex('bikes');
  },
  athletes: function athletes() {
    return knex('athletes');
  },
  frame_fork: function frame_fork() {
    return knex('frame_fork');
  },
  components: function components() {
    return knex('components');
  },
  wheels: function wheels() {
    return knex('wheels');
  },
  dudeAndBike: function dudeAndBike() {
    return knex('athletes')
    .join('bikes', {'bikes.ID': 'athletes.ID'});
  },
  allParts: function allParts(bikeId) {
    return knex('components').where({ 'components.bID' : bikeId })
    .join('frame_fork', { 'frame_fork.bID': 'components.bID' })
    .join('wheels', { 'wheels.bID': 'frame_fork.bID' })
    .join('wear_limits', { 'wear_limits.bike_id': 'wheels.bID' });
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
    for (var i = 0; i < newBikes.length; i++) {
      return knex('bikes').insert({
        bID: newBikes[i].id,
        ID: newID,
        name: newBikes[i].name,
        distance: newBikes[i].distance,
        manu: "unspecified",
        year: "unspecified",
        model: "unspecified"
      })
    };
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
