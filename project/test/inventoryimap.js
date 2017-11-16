rootDir = require('app-root-dir').get()
imap = require(rootDir + '/DataSource/IdentityMap/InventoryItemsIdentityMap.js').instance();

objects = [
  {
    name: 'wai',
    serial_number: '22'
  },
  {
    name:'amanda',
    serial_number: '44'
  }
]

imap.add(objects);
console.log(`Map status :`)
imap.getAll().forEach(item => console.log(item))

imap.delete(['22'])
console.log(`Map status after deleting 22:`)
imap.getAll().forEach(item => console.log(item))


console.log(`When you try to fetch 44:`)
imap.get(['44']).forEach(item => console.log(item))
