const rootPath = require('app-root-dir').get();
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
class ProductDescriptionsIdentityMap{
    constructor(){
        this.productDescTDG = new ProductDescriptionsTDG();
        let context = this.productDescTDG.select();
        this.productDesc = [];
        Promise.all([context])
        .then((values) => {
          this.productDesc = values[0];
        })
    }
    getAll(){
        let result = this.productDesc;
        if(this.productDesc.length > 0){
            return result;
        }
        else{
            var productsFromTDG = this.productDescTDG.select();
            Promise.all([productsFromTDG])
            .then((values) => {
              result = values[0];
            })
            return result;
        }
    }
    get(model_numbers){

        var allProducts = this.getAll();
        if(allProducts != null){
        var results = allProducts.filter(function(desc){
            return model_numbers.findIndex(x => x == desc.model_number) > -1;
        });
        return results;
        }
        else return [];
    }
    add(newProductDescriptions){
        for(var i = 0; i < newProductDescriptions.length; i++){
            if(this.productDesc.findIndex(p => p.model_number == newProductDescriptions[i].model_number) === -1)
                this.productDesc.push(newProductDescriptions[i]);
        }
    }
    delete(productDescriptionsToRemove){
        this.productDesc.filter(function(desc){
            return productDescriptionsToRemove.findIndex(x => x == desc.model_number) === -1;
        });
    }
}
module.exports = ProductDescriptionsIdentityMap;
