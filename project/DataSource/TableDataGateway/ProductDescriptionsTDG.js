class ProductDescriptionsTDG {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.rootPath = require('app-root-dir').get();
    this.configuration = require(this.rootPath + '/knexfile')[this.environment];
    this.connection = require('knex')(this.configuration);
    this.InventoryItems = [];
  }
  add(productDescription) {
    return this.connection.insert({
      'model_number': productDescription.model_number,
      'brand_name': productDescription.brand_name,
      'weight': productDescription.weight,
      'price': productDescription.price,
      'type': productDescription.type
    }, 'model_number').into('ProductDescription');
  }
  select() {
    return this.connection('ProductDescription').select('*');
  }
  selectById(model_number) {
    return this.connection('ProductDescription').where({model_number: model_number}).select('*');
  }
  update(productDescription) {
    // TODO
    return this.connection.update({
      'brand_name': productDescription.brand_name,
      'weight': productDescription.weight,
      'price': productDescription.price,
      'type': productDescription.type
    }).from('ProductDescription').where('model_number', model_number);
  }

}
module.exports = ProductDescriptionsTDG;
