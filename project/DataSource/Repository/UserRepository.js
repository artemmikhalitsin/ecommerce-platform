const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
class UserRepository {
  constructor() {
    this.uow = new UnitOfWork();
  }
  save(user) {
    return database('User').insert(user);
  };

  get() {
    return database('User').select('*');
  }

  authenticate(user) {
    return database('User').where({
      email: user.email,
      password: user.password,
    });
  }

  verifyEmail(email) {
    return database('User').where({
      email: email,
    });
  }
}
module.exports = UserRepository;
