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
    electronicsToDelete = allRecords.filter(function(desc){
      console.log(desc.model_number);
      return electronicsToUpdate.findIndex(e => e.model_number == desc.model_number) === -1;
    });
  }
    this.uow.registerNew(electronicsToAdd);
    this.uow.registerDirty(electronicsToUpdate);
    this.uow.registerDeleted(electronicsToDelete);

    this.uow.commitAll(electronicsToAdd);
    this.ProductDescriptionIM.add(electronicsToAdd);
  }
  /*getModelNumber() {
    for(var i = 0; i < productDescriptions.length; i++){
    for(var j = 0; j < electronics.length; j++){
      if(productDescriptions[i].model_number == electronics[j].model_number &&
         electronicsToUpdate.findIndex(x => x.model_number == electronics[j].model_number) === -1) 
        electronicsToUpdate.push(electronics[j]);
    }
  }
  
  for(var i = 0; i < productDescriptions.length; i++){
    if(electronicsToUpdate.findIndex(x => x.model_number == productDescriptions[i].model_number) === -1 && 
        electronicsToDelete.findIndex(x => x.model_number == productDescriptions[i].model_number) === -1)
      electronicsToDelete.push(productDescriptions[i]);
  }
  for(var i = 0; i < electronics.length; i++){
    if(productDescriptions.findIndex(x => x.model_number == electronics[i].model_number) === -1 &&
        electronicsToAdd.findIndex(x => x.model_number == electronics[i].model_number) === -1)
        electronicsToAdd.push(electronics[i]);
  }
    return this.model_number;
  }

  getBrandName() {
    return this.brand_name;
  }

  getPrice() {
    return this.price;
  }

  getWeight() {
    return this.weight;
  }

  getType() {
    return this.type;
  }

  getAvailability() {
    return this.is_available;
  }

  setModelNumber(model_number) {
    this.model_number = model_number;
  }

  setBrandName(brand_name) {
    this.brand_name = brand_name;
  }

  setPrice(price) {
    this.price = price;
  }

  setWeight(weight) {
    this.weight = weight;
  }

  setType(type) {
    this.type = type;
  }

  setAvailability(is_available) {
    this.is_available = is_available;
  }*/
}

module.exports = ProductDescriptionRepository;
