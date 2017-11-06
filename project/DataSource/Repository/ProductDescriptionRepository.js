'use strict';
const rootPath = require('app-root-dir').get();

let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let ProductDescriptionIdentityMap = require(rootPath + '/DataSource/IdentityMap/ProductDescriptionsIdentityMap.js');
let ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
class ProductDescriptionRepository {
  constructor() {
    this.uow = new UnitOfWork();
    this.ProductDescriptionIM = new ProductDescriptionIdentityMap();
    this.productDescTDG = new ProductDescriptionsTDG();
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

  }
    this.uow.registerNew(electronicsToAdd);
    this.uow.registerDirty(electronicsToUpdate);

    this.uow.commitAll();
    this.ProductDescriptionIM.add(electronicsToAdd);
  }
}

module.exports = ProductDescriptionRepository;
