
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
      table.string('ID').references('ID').inTable('athletes').onDelete('cascade');
      table.string('name');
      table.string('manu').defaultTo('unspecified');
      table.string('year').defaultTo('unspecified');
      table.string('model').defaultTo('unspecified');
      table.integer('distance');
      table.timestamps();
    }),
    knex.schema.createTable('components', table => {
      table.increments('pID').primary();
      table.string('bID').references('bID').inTable('bikes').onDelete('cascade');
      table.integer('distance');
      table.string('tubing').defaultTo('unspecified');
      table.string('fork').defaultTo('unspecified');
      table.integer('forkDistance').defaultTo(0);
      table.string('rearShock').defaultTo('unspecified');
      table.string('rearDistance').defaultTo(0);
      table.string('name');
      table.string('Brakeset').defaultTo('unspecified');
      table.integer('brakeDistance').defaultTo(0);
      table.string('brake_pads').defaultTo('unspecified');
      table.integer('padDistance').defaultTo(0);
      table.string('ShiftLevers').defaultTo('unspecified');
      table.integer('leverDistance').defaultTo(0);
      table.string('FrontDerailleur').defaultTo('unspecified');
      table.integer('fdDistance').defaultTo(0);
      table.string('RearDerailleur').defaultTo('unspecified');
      table.integer('rdDistance').defaultTo(0);
      table.string('Crankset').defaultTo('unspecified');
      table.integer('cranksetDistance').defaultTo(0);
      table.string('Pedals').defaultTo('unspecified');
      table.integer('pedalDistance').defaultTo(0);
      table.string('BottomBracket').defaultTo('unspecified');
      table.integer('bbDistance').defaultTo(0);
      table.string('BBShellWidth').defaultTo('unspecified');
      table.string('RearCogs').defaultTo('unspecified');
      table.integer('cogDistance').defaultTo(0);
      table.string('Chain').defaultTo('unspecified');
      table.integer('chainDistance').defaultTo(0);
      table.string('Seatpost').defaultTo('unspecified');
      table.string('Saddle').defaultTo('unspecified');
      table.integer('saddleDistance').defaultTo(0);
      table.string('Handlebar').defaultTo('unspecified');
      table.string('HandlebarExtensions').defaultTo('unspecified');
      table.string('HandlebarStem').defaultTo('unspecified');
      table.string('Headset').defaultTo('unspecified');
      table.integer('headsetDistance').defaultTo(0);
      table.string('Cables').defaultTo('unspecified');
      table.integer('cableDistance').defaultTo(0);
      table.string('Hubs').defaultTo('unspecified');
      table.integer('hubDistance').defaultTo(0);
      table.string('Rims').defaultTo('unspecified');
      table.integer('rimDistance').defaultTo(0);
      table.string('Tires').defaultTo('unspecified');
      table.integer('tireDistance').defaultTo(0);
      table.string('Spokes').defaultTo('unspecified');
      table.string('SpokeNipples').defaultTo('unspecified');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
     knex.schema.dropTable('frame_fork'),
     knex.schema.dropTable('components'),
     knex.schema.dropTable('wheels'),
     knex.schema.dropTable('bikes'),
     knex.schema.dropTable('athletes')
  ])
};
