rootDir = require('app-root-dir').get();
imap = require(rootDir
  + '/DataSource/IdentityMap/UsersIdentityMap.js').instance();

objects = [
  {
    firstName: 'wai',
    lastName: 'wai',
    phoneNumber: '22',
    email: 'qwer@qwer.ca',
    password: 'qwer',
    fullAddress: '1234 qwer',
  },
  {
    firstName: 'amanda',
    lastName: 'amanda',
    phoneNumber: '234435',
    email: 'hello@hello.ca',
    password: 'hello',
    fullAddress: '0987 qhellower',
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
