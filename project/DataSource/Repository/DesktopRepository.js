'use strict';
const rootPath = require('app-root-dir').get();
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');

class DesktopRepository{
  constructor(){
    this.uow = new UnitOfWork();

  }
  get(args) {
    return this.database('Desktop').select('*');
  }
}
module.exports = DesktopRepository;
