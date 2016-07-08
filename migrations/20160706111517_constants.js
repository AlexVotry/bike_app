
exports.up = function(knex, Promise) {
 return knex.schema.createTable('wear_limits', table => {
    table.string('bike_id').references('bID').inTable('bikes').onDelete('cascade');
    table.integer('seals_dist').defaultTo(6000);
    table.integer('pad_dist').defaultTo(2000);
    table.integer('lever_dist').defaultTo(30000);
    table.integer('fd_dist').defaultTo(20000);
    table.integer('rd_dist').defaultTo(13000);
    table.integer('crank_dist').defaultTo(12000);
    table.integer('pedal_dist').defaultTo(12000);
    table.integer('bb_dist').defaultTo(6000);
    table.integer('cog_dist').defaultTo(6000);
    table.integer('chain_dist').defaultTo(1500);
    table.integer('saddle_dist').defaultTo(15000);
    table.integer('headset_dist').defaultTo(6000);
    table.integer('cable_dist').defaultTo(1500);
    table.integer('hub_dist').defaultTo(6000);
    table.integer('rim_dist').defaultTo(6000);
    table.integer('tire_dist').defaultTo(4000);
    table.integer('pulleys_dist').defaultTo(12000);
    table.integer('cleats_dist').defaultTo(3000);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('wear_limits');
};
