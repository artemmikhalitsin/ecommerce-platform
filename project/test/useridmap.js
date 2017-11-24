rootDir = require('app-root-dir').get();
imap = require(rootDir
  + '/DataSource/IdentityMap/UsersIdentityMap.js').instance();

objects = [
  {
    first_name: 'wai',
    last_name: 'wai',
    phone_number: '22',
    email: 'qwer@qwer.ca',
    password: 'qwer',
    full_address: '1234 qwer',
  },
  {
    first_name: 'amanda',
    last_name: 'amanda',
    phone_number: '234435',
    email: 'hello@hello.ca',
    password: 'hello',
    full_address: '0987 qhellower',
  },
];

imap.add(objects);
console.log(`Map status after adding objects: 
  ${JSON.stringify(imap.getAll())}`);

let hello = imap.getByEmail('hello@hello.ca');
console.log(`User fetched by hello@hello.ca (should be just amanda):
   ${JSON.stringify(hello)}`);

hello = imap.getByEmailAndPassword('hello@hello.ca', 'hello');
console.log(`User fetched by hello@hello.ca and 
  password hello(should be just amanda): ${JSON.stringify(hello)}`);

let wrong = imap.getByEmailAndPassword('hello@hello.ca', 'goodbye');
console.log(`User fetched by hello@hello.ca and 
  password goodbye (should be no results): ${JSON.stringify(wrong)}`);


imap.delete(['qwer@qwer.ca']);
console.log(`Map status after deleting wai: ${JSON.stringify(imap.getAll())}`);
