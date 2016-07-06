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
    console.log(bikeId, " bikeId");
    return knex('components').where({ 'components.bID' : bikeId })
    .join('frame_fork', { 'frame_fork.bID': 'components.bID' })
    .join('wheels', { 'wheels.bID': 'frame_fork.bID'});
  },
  newId: function newId(table, id) {
    return knex(table).where({ ID: id })
    .first()
    .then((exists) => {
      if (!exists) {
        return true;
        console.log("trueDat");
      } else {
        console.log(exists);
        return false;
      }
    });
  },
  ensureAuthenticated: function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

};
