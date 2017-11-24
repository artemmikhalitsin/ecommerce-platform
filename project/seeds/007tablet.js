const tablets = [
  {
    'modelNumber': '425528356-7',
    'compId': 7,
    'dimensionId': 4,
    'displaySize': 25,
    'batteryInfo': 'regional',
    'os': 'Graphic Interface',
    'cameraInfo': 'tellus nulla ut'
  },
  {
    'modelNumber': '847042583-8',
    'compId': 8,
    'dimensionId': 5,
    'displaySize': 24,
    'batteryInfo': 'dedicated',
    'os': 'Extended',
    'cameraInfo': 'nulla ultrices aliquet maecenas'
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
