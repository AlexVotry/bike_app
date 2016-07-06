exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('components').del(),
    knex('frame_fork').del(),
    knex('wheels').del(),

    knex('components').insert({
      bID: "b30856",
      Brakeset:	"Shimano Dura-Ace brakes, Shimano Dura-Ace levers",
      ShiftLevers:	"Shimano Dura-Ace STI",
      FrontDerailleur:	"Shimano Dura-Ace, braze-on",
      RearDerailleur:	"Shimano Dura-Ace",
      Crankset:	"Specialized S-Works, 53/39 teeth",
      Pedals:	"Not applicable",
      BottomBracket:	"Specialized OS integrated ceramic",
      BBShellWidth:	"Unspecified",
      RearCogs:	"10-speed, 12 - 27 teeth",
      Chain: "Shimano Dura-Ace",
      Seatpost:	"Specialized S-Works FACT carbon w/Zertz insert, 27.2mm diameter",
      Saddle:	"Specialized Body Geometry Toupe Team w/Hollow Ti rails",
      Handlebar:	"Specialized S-Works SL Carbon Classic",
      HandlebarExtensions:	"Not included",
      HandlebarStem:	"Specialized S-Works 3D forged",
      Headset:	'1 1/8" - 1 1/2" Aheadset'
    }),
    knex('frame_fork').insert({
      bID: "b30856",
      tubing:	"Specialized FACT 11r IS contruction",
      fork: 	"S-Works FACT carbon monocoque",
      rearShock:	"Not applicable"
    }),

    knex('wheels').insert({
      bID: "b30856",
      Hubs:	"Roval Rapide SL 45",
      Rims:	"Roval Rapide SL 45",
      Tires:	"700 x 23c S-Works Mondo Open Tubular",
      Spokes:	"Unspecified",
      SpokeNipples: "Unspecified"
    })
  );
};
