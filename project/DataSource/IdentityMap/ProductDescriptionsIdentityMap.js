const rootPath = require('app-root-dir').get();
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/PruductDescriptionsTDG.js');
class ProductDescriptionsIdentityMap{
    constructor(){
       // this.ProductDescriptions = uow.loadProductDescriptions();
        this.productDescTDG = new ProductDescriptionsTDG();
        this.uow = new UnitOfWork(); 
        this.context = this.productDescTDG.select();
        Promise.all([this.context])
        .then((values) => {
          this.ProductDescriptions = JSON.stringify(values[0]);
          
        console.log("Product Description IM constructor" + this.ProductDescriptions);
        })
    }
    getAll(){
        let result = this.ProductDescriptions;
        if(result.length > 0){
            console.log("Product Description IM getall if" + result);
            return result;
        }
        else{
            this.productDescTDG.select();
            Promise.all([this.context])
            .then((values) => {
              result = JSON.stringify(values[0]);
              
            console.log("Product Description IM getall" + result);
            return result;
            })
        }
    }
    get(model_numbers){
        return this.getAll().filter(function(desc){
            return model_numbers.findIndex(x => x == desc.model_number) > -1;
        });
    }
    add(newProductDescriptions){
        this.ProductDescriptions.push(newProductDescriptions);
    }
    delete(productDescriptionsToRemove){
        this.ProductDescriptions.filter(function(desc){
            return productDescriptionsToRemove.findIndex(x => x == desc.model_number) === -1;
        });
    }
}
module.exports = ProductDescriptionsIdentityMap;