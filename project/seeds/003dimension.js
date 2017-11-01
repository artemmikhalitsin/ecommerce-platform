const dimensions = [
  {
    'depth': 171,
    'height': 128,
    'width': 55
  },
  {
    'depth': 154,
    'height': 164,
    'width': 194
  },
  {
    'depth': 265,
    'height': 221,
    'width': 224
  },
  {
    'depth': 129,
    'height': 160,
    'width': 300
  },
  {
    'depth': 283,
    'height': 290,
    'width': 248
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Dimensions').del()
    .then(function() {
      // Inserts seed entries
      return knex('Dimensions').insert(dimensions);
    });
};
