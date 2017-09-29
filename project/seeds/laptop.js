const laptops = [{"display_size":24,"battery_info":"Aenean sit amet justo.","os":"eu orci","camera":false,"touch_screen":false}]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Laptop').del()
    .then(function () {
      // Inserts seed entries
      return knex('Laptop').insert(laptops);
    });
};
