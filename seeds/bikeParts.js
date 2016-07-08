exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('components').del(),
    knex('frame_fork').del(),
    knex('wheels').del(),

    knex('components').insert({
      bID: "b30856",
      Brakeset:	"Shimano Dura-Ace brakes, Shimano Dura-Ace levers",
      brakeDistance: 0,
      ShiftLevers:	"Shimano Dura-Ace STI",
      leverDistance: 0,
      FrontDerailleur:	"Shimano Dura-Ace, braze-on",
      fdDistance: 0,
      RearDerailleur:	"Shimano Dura-Ace",
      rdDistance: 0,
      Crankset:	"Shimano Dura-Ace, 53/39 teeth",
      cranksetDistance: 0,
      Pedals:	"Not applicable",
      pedalDistance: 0,
      BottomBracket:	"Specialized OS integrated ceramic",
      bbDistance: 0,
      BBShellWidth:	"Unspecified",
      RearCogs:	"10-speed, 12 - 27 teeth",
      cogDistance: 0,
      Chain: "Shimano Dura-Ace",
      chainDistance: 0,
      Seatpost:	"Specialized S-Works FACT carbon w/Zertz insert, 27.2mm diameter",
      Saddle:	"Specialized Body Geometry Toupe Team w/Hollow Ti rails",
      saddleDistance: 0,
      Handlebar:	"Specialized S-Works SL Carbon Classic",
      HandlebarExtensions:	"Not included",
      HandlebarStem:	"Specialized S-Works 3D forged",
      Headset:	'1 1/8" - 1 1/2" Aheadset',
      headsetDistance: 0,
      Cables: "Unspecified",
      cableDistance: 0
    }),
    knex('frame_fork').insert({
      bID: "b30856",
      tubing:	"Specialized FACT 11r IS contruction",
      fork: 	"S-Works FACT carbon monocoque",
      forkDistance: 0,
      rearShock:	"Not applicable",
      rearDistance: 0
    }),

    knex('wheels').insert({
      bID: "b30856",
      Hubs:	"Roval Rapide SL 45",
      hubDistance: 0,
      Rims:	"Roval Rapide SL 45",
      rimDistance: 0,
      Tires:	"700 x 23c S-Works Mondo Open Tubular",
      tireDistance: 0,
      Spokes:	"Unspecified",
      SpokeNipples: "Unspecified"
    })
  );
};
