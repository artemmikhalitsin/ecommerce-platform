let chai = require('chai');
let rootDir = require('app-root-dir').get();
let ComputerTDG = require(rootDir +'/DataSource/TableDataGateway/ComputersTDG.js');
let DesktopTDG = require(rootDir +'/DataSource/TableDataGateway/DesktopsTDG.js');
let DimensionTDG = require(rootDir +'/DataSource/TableDataGateway/DimensionsTDG.js');
let InventoryTDG = require(rootDir +'/DataSource/TableDataGateway/InventoryItemsTDG.js');
let LaptopTDG = require(rootDir +'/DataSource/TableDataGateway/LaptopsTDG.js');
let MonitorTDG = require(rootDir +'/DataSource/TableDataGateway/MonitorsTDG.js');
//let descriptionTDG = require(rootDir +'/DataSource/TableDataGateway/ProductDesciptionsTDG.js');
let PurchaseTDG = require(rootDir +'/DataSource/TableDataGateway/PurchaseCollectionTDG.js');
let TabletTDG = require(rootDir +'/DataSource/TableDataGateway/TabletsTDG.js');
let TransactionTDG = require(rootDir +'/DataSource/TableDataGateway/TransactionLogTDG.js');

let assert = chai.assert;
let expect = require('chai').expect;
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const Promise = require('bluebird');
const config  = require(rootDir +'/jsconfig.json');
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

const before = (t) => {
    console.log('before');
    const tmp = {};
    const p = new Promise( (resolve, reject) => tmp.resolve = resolve );
    knex.transaction( tx => { t.tx = tx; tmp.resolve() } ).catch( () => {} );
    return p;
}
var knex = require('knex');
var mockDb = require('mock-knex');
var db = knex({
    client: 'sqlite',

mockDb.mock(db);

/**
 * Testing Unit of Work register functions
 */

describe('TableDataGateway', function() {
  let computer1 =
{
    'processor_type': 'discrete',
    'ram_size': 4690,
    'number_cpu_cores': 11,
    'harddrive_size': 849,
    'comp_id':12,
};
let computer2 =
{
    'processor_type': 'discrete',
    'ram_size': 90,
    'number_cpu_cores': 11,
    'harddrive_size': 849,
    'comp_id':12
};

let list = [
{
    "model_number": "913871307-1",
    "comp_id": 1,
    "dimension_id": 1},
  {
    "model_number": "847616645-1",
    "comp_id": 2,
    "dimension_id": 2
}];

let updateDesktop = {
    "model_number": "911307-1",
    "comp_id": 1,
    "dimension_id": 1,
    'id': 1,
}


describe('ComputersTDG', function() {
  describe('#add()', function() {
    it('should insert a computer object '+
    'into the computer table', function(done) {
      const newcomp = new ComputerTDG();
      let test = newcomp.add(computer1);
      expect(test).to.not.be.empty;
      done();
  });
  it('should not insert anything '+
  'into the computer table if nothing is passed', function(done) {
    done();
});
  });
  describe('#update()', function() {
  it('should update the specifications '+
  'of a computer in the database', function(done) {
      const newcomp = new ComputerTDG();
      let test = newcomp.update(computer2);
      expect(test).to.not.be.empty;
      done();
  });
  });
});

describe('DesktopsTDG', function() {
  describe('#add()', function() {
    it('should insert a desktop object '+
    'into the desktop table', function(done) {
      const newdesktop = new DesktopTDG();
      newdesktop.add(1, 3, updateDesktop);
      expect(newdesktop.getAll()).to.include('911307-1');
  });
  it('should not insert anything '+
  'into the computer table if nothing is passed', function(done) {
    done();
});
  });
  describe('#getAll()', function() {
  it('should retrieve the specifications '+
  'of a desktop in the database', function(done) {
    const newdesktop = new DesktopTDG();
      newdesktop.add(1, 3, updateDesktop);
      let test = newdesktop.getAll();
      expect(test).to.have.deep.members(list);
      done();
  });
  });
});




});
