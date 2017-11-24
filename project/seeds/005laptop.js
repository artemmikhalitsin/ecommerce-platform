const laptops = [
  {
    'modelNumber': '891507686-9',
    'compId': 4,
    'displaySize': 67,
    'batteryInfo': 'integer a nibh',
    'os': 'elit proin',
    'touchScreen': false,
    'camera': true
  },
  {
    'modelNumber': '079057815-8',
    'compId': 5,
    'displaySize': 65,
    'batteryInfo': 'integer fwsd frdgt',
    'os': 'elit ksthvd wrycnd',
    'touchScreen': false,
    'camera': true
  },
  {
    'modelNumber': '471262598-8',
    'compId': 6,
    'displaySize': 70,
    'batteryInfo': 'integer b sdfrg iskfe',
    'os': 'elits rdwfr gtde',
    'touchScreen': true,
    'camera': true
  }
];
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Laptop').del()
    .then(function() {
      // Inserts seed entries
      return knex('Laptop').insert(laptops);
    });
};
