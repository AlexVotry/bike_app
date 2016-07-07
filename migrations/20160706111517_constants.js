
exports.up = function(knex, Promise) {
 return knex.schema.createTable('wear_limits', table => {
    table.string('bike_id').references('bID').inTable('bikes');
    table.integer('seals_dist');
    table.integer('pad_dist')
    table.integer('lever_dist');
    table.integer('fd_dist');
    table.integer('rd_dist');
    table.integer('crank_dist');
    table.integer('pedal_dist');
    table.integer('bb_dist');
    table.integer('cog_dist');
    table.integer('chain_dist');
    table.integer('saddle_dist');
    table.integer('headset_dist');
    table.integer('cable_dist');
    table.integer('hub_dist');
    table.integer('rim_dist');
    table.integer('tire_dist');
    table.integer('pulleys_dist');
    table.integer('cleats_dist');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('wear_limits');
};
