exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('athletes').del(),

    // Inserts seed entries
    knex('athletes').insert({
      ID: '120315,',
      firstname: 'Joe',
      lastname: 'Friel',
      picture: 'http://cdn.c.photoshelter.com/img-get2/I0000oxOtTiZNczE/fit=1000x750/Joe-Friel-Denver-CO.jpg'
    }),
    knex('athletes').insert({
      ID: '154012,',
      firstname: 'Steve',
      lastname: 'Fisher',
      picture: 'http://www.girodiburnaby.com/wp-content/uploads/2013/07/Steve-Fisher-TdD3RR-861-2-copy.jpg'
    }),
    knex('athletes').insert({
      ID: '183482,',
      firstname: 'Bart',
      lastname: 'Hawkinson',
      picture: 'http://i2.wp.com/www.therapeuticassociatesracing.com/wp-content/uploads/2014/11/bart.jpg'
    })
  );
};


// access_token = d2502b6017d0f7b5427d74917822a532f5f9a43e
