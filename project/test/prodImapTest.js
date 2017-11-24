rootPath = require('app-root-dir').get();
imap = require(rootPath
  + '/DataSource/IdentityMap/ProductDescriptionsIdentityMap.js').instance();

let amanda = {
  modelNumber: '12345',
  name: 'amanda',
};

let wai = {
  modelNumber: '123',
  name: 'wai',
};

console.log('Initiating product description identity map test.');

console.log('Adding new products');
imap.add([amanda, wai]);
console.log(`State of identity map after adding:`
  + `${JSON.stringify(imap.getAll())}`);

amanda.name = 'omondo';

imap.update([amanda]);
console.log(`State of identity map after updating amanda's name to omondo:`
  + `${JSON.stringify(imap.getAll())}`);
