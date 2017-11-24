const desktops = [
  {
    "modelNumber": "913871307-1",
    "compId": 1,
    "dimensionId": 1
  },
  {
    "modelNumber": "847616645-1",
    "compId": 2,
    "dimensionId": 2
  },
  {
    "modelNumber": "937548440-8",
    "compId": 3,
    "dimensionId": 3
  }
];


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Desktop').del()
    .then(function() {
      // Inserts seed entries
      return knex('Desktop').insert(desktops);
    });
};
