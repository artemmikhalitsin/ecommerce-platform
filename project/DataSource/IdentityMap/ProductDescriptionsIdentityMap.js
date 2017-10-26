class ProductDescriptionsIdentityMap {
    constructor() {
        this.rootPath = require('app-root-dir').get();
        let UnitOfWork = require(this.rootPath + '/DataSource/UnitOfWork.js');
        let uow = new UnitOfWork();
        this.ProductDescriptions = uow.loadProductDescriptions();
    }
    get(model_numbers) {
        return this.ProductDescriptions.filter(function(desc) {
            return model_numbers.findIndex(
              (x) => x == desc.model_number
            ) > -1;
        });
    }
    add(newProductDescriptions) {
        this.ProductDescriptions.push(newProductDescriptions);
    }
    delete(productDescriptionsToRemove) {
        this.ProductDescriptions.filter(function(desc) {
            return productDescriptionsToRemove.findIndex(
              (x) => x == desc.model_number
            ) === -1;
        });
    }
}
module.exports = ProductDescriptionsIdentityMap;
