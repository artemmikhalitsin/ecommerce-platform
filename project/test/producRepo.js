const rootPath = require('app-root-dir').get();
<<<<<<< HEAD
const UserRepo = require(rootPath
  + '/DataSource/Repository/InventoryItemRepository.js');
=======
const UserRepo = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');
>>>>>>> b77e2577262d59ed57c73274fba2bd4e32e7ecca

let repo = new UserRepo();

repo.getAllInventoryItems().then(
  (result) => {
 console.log(`Response from server: ${JSON.stringify(result)}`);
}
);

repo.getAdmins().then(
  (result) => {
    console.log(`Response from server: ${JSON.stringify(result)}`);
  }
);
