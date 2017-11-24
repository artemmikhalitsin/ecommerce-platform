const monitors = [
  {
    'modelNumber': '141278542-1',
    'displaySize': 32
  },
  {
    'modelNumber': '511703112-1',
    'displaySize': 40
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Monitor').del()
    .then(function() {
      // Inserts seed entries
      return knex('Monitor').insert(monitors);
    });
};
