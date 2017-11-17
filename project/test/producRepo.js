const rootPath = require('app-root-dir').get();
const userRepo = require(rootPath + '/DataSource/Repository/InventoryItemRepository.js');

let repo = new userRepo();

repo.getAllInventoryItems().then(
  (result) => {
 console.log(`Response from server: ${JSON.stringify(result)}`);
}
);
