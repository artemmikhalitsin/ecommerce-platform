const rootPath = require('app-root-dir').get();
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
class ProductDescriptionsIdentityMap{
    constructor(){
       // this.ProductDescriptions = uow.loadProductDescriptions();
        this.productDescTDG = new ProductDescriptionsTDG();
        this.uow = new UnitOfWork(); 
        let context = this.productDescTDG.select();
        this.productDesc = [];
        Promise.all([context])
        .then((values) => {
          this.productDesc = values[0];
          console.log("Printing...." + JSON.stringify(values[0]));
        })
    }
    getAll(){
        let result = this.productDesc;
        if(this.productDesc.length > 0){
            return result;
        }
        else{
            result = this.productDescTDG.select();
            Promise.all([result])
            .then((values) => {
              return values[0];
            })
            return [];
        }
    }
    get(model_numbers){
       
        var allProducts = this.getAll();
        console.log(allProducts);
        console.log(model_numbers);
        if(allProducts != null){
        return allProducts.filter(function(desc){
            console.log(model_numbers);
            return model_numbers.findIndex(x => x == desc.model_number) > -1;
        });
        return [];
    }
    }
    add(newProductDescriptions){
        this.productDesc.push(newProductDescriptions);
    }
    delete(productDescriptionsToRemove){
        this.productDesc.filter(function(desc){
            return productDescriptionsToRemove.findIndex(x => x == desc.model_number) === -1;
        });
    }
}
module.exports = ProductDescriptionsIdentityMap;