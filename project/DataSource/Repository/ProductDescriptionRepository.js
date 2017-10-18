'use strict';
const rootPath = require('app-root-dir').get();

let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork2.js');
let uow = new UnitOfWork();

class ProductDescription {
  constructor() {
    this.model_number = null;
    this.brand_name = null;
    this.price = 0;
    this.weight = 0;
    this.type = null;
    this.is_available = false;
  }

  getAllProductsDescription() {
    return uow.getAllProductsDescription();
  }

  getModelNumber() {
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
  }
}

module.exports = ProductDescription;
