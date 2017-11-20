const users = [
  {
    'first_name': 'Admin',
    'last_name': 'Admin',
    'email': 'admin@admin.com',
    'full_address': '123 Main Street',
    'is_admin': true,
    'phone_number': '1234567890',
    'password': '1fe90bd87a70bf901f0fe4736272f24007f898aa14d2b02ba7a641161f4c2f33',
  },
  {
    'first_name': 'Wai Lun',
    'last_name': 'Lau',
    'email': 'wl.wailau@gmail.com',
    'full_address': '123 Main Street',
    'is_admin': true,
    'phone_number': '1234567890',
    'password': 'fdd0994dc7e55628e820d975617b42e20832cee27f6aa2e5edf67d9f157fdaec',
  },
  {
    'first_name': 'Constantinos',
    'last_name': 'Constantinides',
    'email': 'cc@cse.concordia.ca',
    'full_address': '123 Main Street',
    'is_admin': true,
    'phone_number': '1234567890',
    'password': '5d67f20efe3f11f3c5f92e591866bf66b9533ac79df3fb90ee3a84f451f12558',
  },
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function() {
      // Inserts seed entries
      return knex('User').insert(users);
    });
};
