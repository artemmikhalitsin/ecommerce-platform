// 'use strict';

// const chai = require('chai');
// const expect = chai.expect;
// chai.use(require('chai-http'));
// const sinon = require('sinon');

// // const app = (rootPath+ 'index.js');
// const rootPath = require('app-root-dir').get();
// const InventoryItemsTDG = require(rootPath +
//   '/DataSource/TableDataGateway/InventoryItemsTDG.js');
// const PurchaseTDG = require(rootPath +
//   '/DataSource/TableDataGateway/PurchaseCollectionTDG.js');
// const ProductDescTDG = require(rootPath +
//   '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
// const TransactionTDG = require(rootPath +
//   '/DataSource/TableDataGateway/TransactionLogTDG.js');
// const UoW = require(rootPath + '/DataSource/UnitOfWork.js');
// // let server;

// //  const environment = process.env.NODE_ENV || 'development';
// //  const configuration = require(rootPath + '/knexfile')[environment];
// //  const connection = require('knex')(configuration);

// /**
//  * Testing Unit of Work register functions
//  */
// describe('uow basic test', function() {
//   ()=>timeout(5000);
//   before(function() {
//   });

//   after(function() {
//   });

//   it('should pass', function() {
//     const newUoW = new UoW();
//     newUoW.registerNew('test');
//     expect(newUoW.newElements).to.include('test');
//   });
// });

// /**
//  * Testing Unit of Work commitAll function
//  */
// describe('uow commits the correct functions the correct number of times;'
//   +' done without database',
//   function() {
//   let newDelete;
//   let newAdd;
//   let newPurchase;
//   let delPurchase;
//   let newTrsct;
//   let newUpdate;
//   let newAddDesc;
//   ()=>timeout(5000);
//   beforeEach(function() {
//     newDelete = sinon.stub(InventoryItemsTDG, 'delete')
//     .callsFake(function newDelete() {
//       console.log('boop');
//       return Promise.resolve();
//     });

//     newAdd = sinon.stub(InventoryItemsTDG.prototype, 'add')
//     .callsFake(function newAdd() {
//       console.log('boop');
//       return Promise.resolve();
//     });

//     newPurchase = sinon.stub(PurchaseTDG.prototype, 'add')
//     .callsFake(function newPurchase() {
//       return Promise.resolve();
//     });

//     delPurchase = sinon.stub(PurchaseTDG.prototype, 'delete')
//     .callsFake(function delPurchase() {
//       return Promise.resolve();
//     });

//     newTrsct = sinon.stub(TransactionTDG.prototype, 'add')
//     .callsFake(function newTrsct() {
//       return Promise.resolve();
//     });

//     newUpdate = sinon.stub(ProductDescTDG.prototype, 'update')
//     .callsFake(function newUpdate() {
//       return Promise.resolve();
//     });

//     newAddDesc = sinon.stub(ProductDescTDG.prototype, 'add')
//     .callsFake(function newAddDesc() {
//       console.log('boop');
//       return [2];
//     });
//   });

//   afterEach(function() {
//     newDelete.restore();
//     newAdd.restore();
//     newPurchase.restore();
//     delPurchase.restore();
//     newTrsct.restore();
//     newUpdate.restore();
//     newAddDesc.restore();
//   });

//   it('should call thrice every update method', function() {
//     const newUoW = new UoW();

//     for (let i = 0; i < 2; i++) {
//       newUoW.registerNew(i);
//       newUoW.registerNewPurchase(i);
//       newUoW.registerReturn(i);
//       newUoW.registerDirty(i);
//       newUoW.registerDeleted(i);
//       newUoW.registerNewItem(i);
//       newUoW.registerDeletedItem(i);
//       newUoW.registerTransaction(i);
//     }
//     newUoW.commitAll();
//     sinon.assert.calledThrice(newAddDesc);
//     sinon.assert.calledThrice(newUpdate);
//     sinon.assert.calledThrice(newTrsct);
//     sinon.assert.calledThrice(delPurchase);
//     sinon.assert.calledThrice(newPurchase);
//     sinon.assert.calledThrice(newAdd);
//     sinon.assert.calledThrice(newDelete);
//   });
// });
