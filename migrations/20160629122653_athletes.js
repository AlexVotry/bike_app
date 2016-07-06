
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('athletes', table => {
      table.string('ID').primary();
      table.string('firstname');
      table.string('lastname');
      table.string('picture');
      table.string('accessToken');
    }),
    knex.schema.createTable('bikes', table => {
      table.string('bID').primary();
      table.string('ID').references('ID').inTable('athletes');
      table.string('name');
      table.string('manu');
      table.string('year');
      table.string('model');
      table.integer('distance').defaultTo(0);
      table.timestamps();
    }),
    knex.schema.createTable('frame_fork', table => {
      table.increments('pID').primary();
      table.string('bID').references('bID').inTable('bikes');
      table.string('tubing');
      table.string('fork');
      table.integer('forkDistance');
      table.string('rearShock');
      table.string('rearDistance');
    }),
    knex.schema.createTable('components', table => {
      table.string('bID').references('bID').inTable('bikes');
      table.string('Brakeset');
      table.integer('brakeDistance');
      table.string('ShiftLevers');
      table.integer('leverDistance');
      table.string('FrontDerailleur');
      table.integer('fdDistance');
      table.string('RearDerailleur');
      table.integer('rdDistance');
      table.string('Crankset');
      table.integer('cranksetDistance');
      table.string('Pedals');
      table.integer('pedalDistance');
      table.string('BottomBracket');
      table.integer('bbDistance');
      table.string('BBShellWidth');
      table.string('RearCogs');
      table.integer('cogDistance');
      table.string('Chain');
      table.integer('chainDistance');
      table.string('Seatpost');
      table.string('Saddle');
      table.integer('saddleDistance');
      table.string('Handlebar');
      table.string('HandlebarExtensions');
      table.string('HandlebarStem');
      table.string('Headset');
      table.integer('headsetDistance');
      table.string('Cables');
      table.integer('cableDistance');
    }),
    knex.schema.createTable('wheels', table => {
      table.string('bID').references('bID').inTable('bikes');
      table.string('Hubs');
      table.integer('hubDistance');
      table.string('Rims');
      table.integer('rimDistance');
      table.string('Tires');
      table.integer('tireDistance');
      table.string('Spokes');
      table.string('SpokeNipples');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('frame_fork');
  return knex.schema.dropTable('components');
  return knex.schema.dropTable('wheels');
  return knex.schema.dropTable('bikes');
  return knex.schema.dropTable('athletes');
};
