/**
 * Seeding the User table with 3 Admins and 3 regular accounts
 * @author Ajmer Singh Gadreh
 */
const users = [
  // The following 3 are the admin accounts
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
    'last_name': 'Dr. Constantinides',
    'email': 'cc@cse.concordia.ca',
    'full_address': '123 Main Street',
    'is_admin': true,
    'phone_number': '1234567890',
    'password': '5d67f20efe3f11f3c5f92e591866bf66b9533ac79df3fb90ee3a84f451f12558',
  },
  // The following 3 are the regular accounts
  {
    'first_name': 'Adrianna',
    'last_name': 'Diaz',
    'email': 'adrianna.dev@gmail.com',
    'full_address': '123 Main Street',
    'is_admin': false,
    'phone_number': '1234567890',
    // password hash needs to be changed
    'password': '5d67f20efe3f11f3c5f92e591866bf66b9533ac79df3fb90ee3a84f451f12558',
  },
  {
    'first_name': 'Vidhi',
    'last_name': 'Maisuria',
    'email': 'vidhi.9@hotmail.com',
    'full_address': '123 Main Street',
    'is_admin': false,
    'phone_number': '1234567890',
    // password hash needs to be changed
    'password': '5d67f20efe3f11f3c5f92e591866bf66b9533ac79df3fb90ee3a84f451f12558',
  },
  {
    'first_name': 'Ajmer Singh',
    'last_name': 'Gadreh',
    'email': 'ajmer226@yahoo.ca',
    'full_address': '123 Main Street',
    'is_admin': false,
    'phone_number': '1234567890',
    // password hash needs to be changed
    'password': '5d67f20efe3f11f3c5f92e591866bf66b9533ac79df3fb90ee3a84f451f12558',
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function() {
      // Inserts seed entries
      return knex('User').insert(users);
    });
};
