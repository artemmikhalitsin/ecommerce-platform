rootDir = require('app-root-dir').get()
imap = require(rootDir + '/DataSource/IdentityMap/UserIdentityMap.js').instance();

objects = [
  {
    first_name: 'wai',
    last_name: 'wai',
    phone_number: '22',
    email: 'qwer@qwer.ca',
    password: 'qwer',
    full_address: '1234 qwer'
  }, {
    first_name: 'amanda',
    last_name: 'amanda',
    phone_number: '234435',
    email: 'hello@hello.ca',
    password: 'hello',
    full_address: '0987 qhellower'
  }
]

imap.add(objects);
console.log(`Map status :`)
imap.getAll().forEach(item => console.log(item))

imap.delete(['qwer@qwer.ca'])
console.log(`Map status after deleting 22:`)
imap.getAll().forEach(item => console.log(item))

console.log(`When you try to fetch 44:`)
imap.get(['qwer@qwer.ca']).forEach(item => console.log(item))
