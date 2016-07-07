exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('wear_limits').del(),

    knex('wear_limits').insert({
      bike_id: 'b30856',
      seals_dist: 6000,
      pad_dist: 2000,
      lever_dist: 30000,
      fd_dist: 20000,
      rd_dist: 13000,
      crank_dist: 12000,
      pedal_dist: 12000,
      bb_dist: 6000,
      cog_dist: 6000,
      chain_dist: 1500,
      saddle_dist: 15000,
      headset_dist: 6000,
      cable_dist: 1500,
      hub_dist: 6000,
      rim_dist: 6000,
      tire_dist: 4000,
      pulleys_dist: 12000,
      cleats_dist: 3000
    })
  );
};
