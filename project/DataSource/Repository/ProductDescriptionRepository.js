'use strict';
const rootPath = require('app-root-dir').get();

let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let ProductDescriptionIdentityMap = require(rootPath + '/DataSource/IdentityMap/ProductDescriptionsIdentityMap.js');
let ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/PruductDescriptionsTDG.js');
class ProductDescriptionRepository {
  constructor() {
    this.uow = new UnitOfWork();
    this.ProductDescriptionIM = new ProductDescriptionIdentityMap();
    this.productDescTDG = new ProductDescriptionsTDG();
  }
  getAll(){
    let context = this.ProductDescriptionIM.getAll();
    console.log("From Product description Repo " + context);
    if (context.length <= 0){
      context = productDescTDG.select();
      this.ProductDescriptionIM.add(context);
    }
    return context;
  }
  getAllProductsDescription() {
    return this.uow.getAllProductsDescription();
  }
  getById(id){
    return this.ProductDescriptionIM.get([id]);
  }
  getByIds(ids){
    //have to do same thing as getAll implement add in case not found to Identity mapper
    return this.ProductDescriptionIM.get(id);
  }
  save(products){
    var electronicsToAdd = [];
    var electronicsToUpdate = [];
    var electronicsToDelete = [];

    let productIds = products.map(p => p.model_number);
    let context = this.getByIds(productIds);
    for(var i = 0; i < products.length; i++){
      if(context.findIndex(p => p.model_number == products[i].model_number) !== -1
          && electronicsToUpdate.findIndex(e => e.model_number == products[i].model_number) === -1){
            electronicsToUpdate.push(products[i]);
      }
      else if(context.findIndex(p => p.model_number == products[i].model_number) === -1
              && electronicsToAdd.findIndex(e => e.model_number == products[i].model_number) === -1){
                electronicsToAdd.push(products[i]);
              }
    }
    electronicsToDelete = context.filter(p => electronicsToUpdate.indexOf(p) == -1);
    console.log("Electronics to add (repo) " + electronicsToAdd);
    console.log("Electronics to update (repo) " + electronicsToUpdate);
    console.log("Electronics to delete (repo) " + electronicsToDelete);
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
