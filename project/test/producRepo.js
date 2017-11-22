const rootPath = require('app-root-dir').get();
const UserRepo = require(rootPath
  + '/DataSource/Repository/InventoryItemRepository.js');

let repo = new UserRepo();

repo.getAllInventoryItems().then(
  (result) => {
 console.log(`Response from server: ${JSON.stringify(result)}`);
}
);
