
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
      table.string('manu').defaultTo(null);
      table.string('year').defaultTo(null);
      table.string('model').defaultTo(null);
      table.integer('distance').defaultTo(0);
      table.timestamps();
    }),
    knex.schema.createTable('frameAndFork', table => {
      table.increments('pID').primary();
      table.string('bID').references('bID').inTable('bikes');
      table.string('tubing').defaulTo(null);
      table.string('fork').defaulTo(null);
      table.integer('forkDistance').defaulTo(0);
      table.string('rearShock').defaulTo(null);
      table.integer('rearDistance').defaultTo(0);
    }),
    knex.schema.createTable('components', table => {
      table.string('bID').references('bID').inTable('bikes');
      table.string('Brakeset').defaulTo(null);
      table.integer('brakeDistance').defaultTo(0);
      table.string('ShiftLevers').defaulTo(null);
      table.integer('leverDistance').defaultTo(0);
      table.string('FrontDerailleur').defaulTo(null);
      table.integer('fdDistance').defaultTo(0);
      table.string('RearDerailleur').defaulTo(null);
      table.integer('rdDistance').defaultTo(0);
      table.string('Crankset').defaulTo(null);
      table.integer('cranksetDistance').defaultTo(0);
      table.string('Pedals').defaulTo(null);
      table.integer('pedalDistance').defaultTo(0);
      table.string('BottomBracket').defaulTo(null);
      table.integer('bbDistance').defaultTo(0);
      table.string('BBShellWidth').defaulTo(null);
      table.string('Rear Cogs').defaulTo(null);
      table.integer('cogDistance').defaultTo(0);
      table.string('Chain').defaulTo(null);
      table.integer('chainDistance').defaultTo(0);
      table.string('Seatpost').defaulTo(null);
      table.string('Saddle').defaulTo(null);
      table.integer('saddleDistance').defaultTo(0);
      table.string('Handlebar').defaulTo(null);
      table.string('HandlebarExtensions').defaulTo(null);
      table.string('HandlebarStem').defaulTo(null);
      table.string('Headset').defaulTo(null);
      table.integer('headsetDistance').defaultTo(0);
      table.string('Cables').defaulTo(null);
      table.integer('cableDistance').defaultTo(0);
    }),
    knex.schema.createTable('wheels', table => {
      table.string('bID').references('bID').inTable('bikes');
      table.string('Hubs').defaulTo(null);
      table.integer('hubDistance').defaultTo(0);
      table.string('Rims').defaulTo(null);
      table.integer('rimDistance').defaultTo(0);
      table.string('Tires').defaulTo(null);
      table.integer('tireDistance').defaultTo(0);
      table.string('Spokes').defaulTo(null);
      table.string('SpokeNipples').defaulTo(null);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('athletes');
  return knex.schema.dropTable('bikes');
  return knex.schema.dropTable('frameAndFork');
  return knex.schema.dropTable('components');
  return knex.schema.dropTable('wheels');
};
