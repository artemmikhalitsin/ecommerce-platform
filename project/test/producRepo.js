const rootPath = require('app-root-dir').get();
const userRepo = require(rootPath + '/DataSource/Repository/UserRepository.js');

let repo = new userRepo();

repo.getAdmins().then(
  (result) => {
console.log(`Response from server: ${JSON.stringify(result)}`);
}
);
