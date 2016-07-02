const knex = require('./knex');

module.exports = {
  bikes: function bikes() {
    return knex('bikes');
  },
  athletes: function athletes() {
    return knex('athletes');
  },
  frameAndFork: function frameAndFork() {
    return knex('frameAndFork');
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
  newId: function newId(table, id) {
    knex(table).where({ ID: id })
    .first()
    .then((exists) => {
      if (!exists) {
        return true;
      }
    });
  },
  ensureAuthenticated: function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

};
