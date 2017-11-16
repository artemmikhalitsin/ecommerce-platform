const tablets = [
  {
    'model_number': '425528356-7',
    'comp_id': 7,
    'dimension_id': 4,
    'display_size': 25,
    'battery_info': 'regional',
    'os': 'Graphic Interface',
    'camera_info': 'tellus nulla ut'
  },
  {
    'model_number': '847042583-8',
    'comp_id': 8,
    'dimension_id': 5,
    'display_size': 24,
    'battery_info': 'dedicated',
    'os': 'Extended',
    'camera_info': 'nulla ultrices aliquet maecenas'
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Tablet').del()
    .then(function() {
      // Inserts seed entries
      return knex('Tablet').insert(tablets);
    });
};
