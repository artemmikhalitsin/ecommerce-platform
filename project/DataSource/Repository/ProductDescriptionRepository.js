'use strict';
const rootPath = require('app-root-dir').get();

let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let ProductDescriptionIdentityMap = require(rootPath + '/DataSource/IdentityMap/ProductDescriptionsIdentityMap.js');
let ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
let InventoryItemsIdentityMap = require(rootPath + '/DataSource/IdentityMap/InventoryItemsIdentityMap.js');
class ProductDescriptionRepository {
  constructor() {
    this.uow = new UnitOfWork();
    this.ProductDescriptionIM = new ProductDescriptionIdentityMap();
    this.productDescTDG = new ProductDescriptionsTDG();
    this.inventoryItemsIM = new InventoryItemsIdentityMap();
  }
  getAll(){
      let context = this.productDescTDG.select();

      Promise.all([context]).then((values)=>{
        context = values[0];
      });
      this.ProductDescriptionIM.add(context);
    return context;
  }
  getById(id){
    return this.ProductDescriptionIM.get([id]);
  }
  getByIds(ids){
    let products = this.ProductDescriptionIM.get(ids);
    if(products.length <= 0 || products.length < ids.length){
      var prodDescFromTDG = this.productDescTDG.select();
            Promise.all([prodDescFromTDG]).then((values)=>{
              products = values[0];
              this.ProductDescriptionIM.add(products);
              return products;
            });
    }
    return products;
  }
  save(products){
    var electronicsToAdd = [];
    var electronicsToUpdate = [];
    var electronicsToDelete = [];

    let productIds = products.map(p => p.model_number);

    if(productIds.length > 0){
    let context = this.getByIds(productIds);
    let allRecords = this.ProductDescriptionIM.getAll();
    let allInventoryItems = this.inventoryItemsIM.getByModelNumbers(productIds);
    for(var i = 0; i < products.length; i++){
      if(context.findIndex(p => p.model_number == products[i].model_number) !== -1
          && electronicsToUpdate.findIndex(e => e.model_number == products[i].model_number) === -1){
            electronicsToUpdate.push(products[i]);
      }
      else if(allRecords.findIndex(p => p.model_number == products[i].model_number) === -1
              && electronicsToAdd.findIndex(e => e.model_number == products[i].model_number) === -1){
                electronicsToAdd.push(products[i]);
              }
    }
    /*electronicsToDelete = allInventoryItems.filter(function(item){
      console.log(item.model_number);
      return electronicsToUpdate.findIndex(e => e.serial_number.forEach(function(ser_number){
        ser_number == item.serial_number
        console.log("serial number " + ser_number);
      })) === -1;
    });*/
    /*electronicsToDelete = allInventoryItems.filter(function(item){
      let elect = electronicsToUpdate.find(e => e.model_number == item.model_number).serial_number;
      console.log("Electronic item " + elect);
      console.log("with serial num " + item.serial_number);
      return elect.findIndex(i => i == item.serial_number) === -1;
    });*/

  }
    this.uow.registerNew(electronicsToAdd);
    this.uow.registerDirty(electronicsToUpdate);
    //this.uow.registerDeleted(electronicsToDelete);

    this.uow.commitAll();
    this.ProductDescriptionIM.add(electronicsToAdd);
  }
}

module.exports = ProductDescriptionRepository;
