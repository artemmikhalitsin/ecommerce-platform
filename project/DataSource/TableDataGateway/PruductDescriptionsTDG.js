class ProductDescriptionsTDG{
    constructor(){
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
        this.InventoryItems = [];
    }
    add(productDescription){
        return this.connection
                    .insert({
                        'model_number': productDescription.model_number,
                        'brand_name': productDescription.brand_name,
                        'weight': productDescription.weight,
                        'price': productDescription.price,
                        'type': productDescription.type,
                    }, 'model_number')
                    .into('ProductDescription');
    }
    select(){
        return this.connection('ProductDescription')
                    .select('*');
    }
    select(model_number){
        return this.connection('ProductDescription')
                    .select('*')
                    .where('model_number = ' + model_number);
    }
    update(productDescription){
        //TODO
    }
    //update is not in current requirements for inventory items
    /*delete(productDescription){
    }*/
}
module.exports = ProductDescriptionsTDG;